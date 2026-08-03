// Vercel serverless function — POST /api/stripe-webhook
//
// Stripe calls this endpoint directly (not the browser) whenever a
// checkout session completes. It verifies the event really came from
// Stripe, then emails you a "new order" notification with the order
// details and shipping address so you can action delivery.
//
// Requires these environment variables in Vercel:
//   STRIPE_SECRET_KEY        (already set for checkout)
//   STRIPE_WEBHOOK_SECRET    (from the Stripe webhook you create — see README)
//   RESEND_API_KEY           (from resend.com — free tier is fine)
//   ORDER_NOTIFICATION_EMAIL (optional, defaults to info@viitalon.com)
//   ORDER_NOTIFICATION_FROM  (optional, defaults to orders@viitalon.com —
//                             must be on a domain verified in Resend)

import Stripe from 'stripe';

// Stripe needs the raw, unparsed request body to verify the webhook
// signature, so we turn off Vercel's automatic JSON body parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function formatMoney(amountInCents, currency) {
  const amount = (amountInCents || 0) / 100;
  try {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: (currency || 'nzd').toUpperCase(),
    }).format(amount);
  } catch {
    return `${(currency || 'nzd').toUpperCase()} ${amount.toFixed(2)}`;
  }
}

async function sendMerchantNotification(session) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not set — skipping merchant email notification.');
    return;
  }

  const notifyTo = process.env.ORDER_NOTIFICATION_EMAIL || 'info@viitalon.com';
  const fromAddress = process.env.ORDER_NOTIFICATION_FROM || 'orders@viitalon.com';

  const items = session.line_items?.data || [];
  const itemsHtml = items
    .map(
      (li) =>
        `<tr><td style="padding:4px 12px 4px 0;">${li.description}${li.quantity > 1 ? ` × ${li.quantity}` : ''}</td><td style="padding:4px 0; text-align:right;">${formatMoney(li.amount_total, session.currency)}</td></tr>`
    )
    .join('');

  const shipping = session.shipping_details;
  const address = shipping?.address;
  const addressHtml = address
    ? `${shipping.name || ''}<br/>${address.line1 || ''}${address.line2 ? ', ' + address.line2 : ''}<br/>${address.city || ''} ${address.postal_code || ''}<br/>${address.country || ''}`
    : 'No shipping address collected.';

  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 480px; color: #1a1a1a;">
      <h2 style="margin-bottom: 4px;">New VIITALON order</h2>
      <p style="font-size: 18px; margin-top: 0;"><strong>${formatMoney(session.amount_total, session.currency)}</strong></p>
      <p style="color: #555;">From: ${session.customer_details?.email || 'unknown email'}</p>
      <table style="width:100%; border-collapse: collapse; margin: 16px 0;">${itemsHtml}</table>
      <h3 style="margin-bottom: 4px;">Ship to</h3>
      <p style="color: #333;">${addressHtml}</p>
      ${session.payment_intent ? `<p><a href="https://dashboard.stripe.com/payments/${session.payment_intent}">View payment in Stripe →</a></p>` : ''}
    </div>
  `;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromAddress,
      to: notifyTo,
      subject: `New order — ${formatMoney(session.amount_total, session.currency)}`,
      html,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    console.error('Resend API error:', res.status, errText);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method not allowed');
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey || !webhookSecret) {
    console.error('Stripe webhook is not configured (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET).');
    return res.status(500).send('Webhook not configured');
  }

  const stripe = new Stripe(secretKey);
  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    try {
      const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ['line_items'],
      });
      await sendMerchantNotification(session);
    } catch (err) {
      // Log and swallow — Stripe retries the webhook on non-2xx responses,
      // and we don't want an email hiccup to trigger repeated retries.
      console.error('Failed to send merchant notification email:', err);
    }
  }

  return res.status(200).json({ received: true });
}
