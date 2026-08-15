// Vercel serverless function — POST /api/stripe-webhook
//
// Stripe calls this endpoint directly (not the browser) whenever a
// checkout session completes. It verifies the event really came from
// Stripe, then sends two emails via Resend:
//   1. A branded order confirmation to the customer.
//   2. A "new order" notification to the merchant, with shipping
//      address, so you can action delivery.
//
// Requires these environment variables in Vercel:
//   STRIPE_SECRET_KEY        (already set for checkout)
//   STRIPE_WEBHOOK_SECRET    (from the Stripe webhook you create — see README)
//   RESEND_API_KEY           (from resend.com — free tier is fine)
//   ORDER_NOTIFICATION_EMAIL (optional, defaults to info@viitalon.com —
//                             comma-separate for multiple internal addresses)
//   SUPPLIER_NOTIFICATION_EMAIL (optional, defaults to sales@edh.nz —
//                             the fulfilment supplier who ships the order;
//                             comma-separate for multiple)
//   ORDER_NOTIFICATION_FROM  (optional, defaults to orders@viitalon.com —
//                             must be on a domain verified in Resend)
//   SITE_URL                 (optional, defaults to https://viitalon.com —
//                             used for links and the logo in the email)

import Stripe from 'stripe';

// Stripe needs the raw, unparsed request body to verify the webhook
// signature, so we turn off Vercel's automatic JSON body parsing.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Brand tokens — kept in sync with tailwind.config.js so the emails
// look like the rest of the site even though email clients can't
// load Tailwind.
const BRAND = {
  ink: '#0a0a0a',
  inkSurface: '#111111',
  cream: '#f2ece4',
  creamDim: '#cfcac2',
  vital: '#7d000c',
  vitalBright: '#a8001a',
  ash: '#8a8580',
  line: '#2a2a2a',
  headingFont: "'Georgia', 'Times New Roman', serif",
  bodyFont: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
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

function getSiteUrl() {
  return process.env.SITE_URL || 'https://viitalon.com';
}

async function sendViaResend({ from, to, subject, html }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error(`RESEND_API_KEY not set — cannot send email: ${subject}`);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Resend API error ${res.status} for "${subject}": ${errText}`);
  }
}

// ---------------------------------------------------------------------------
// Customer-facing order confirmation
// ---------------------------------------------------------------------------

function renderCustomerEmail(session) {
  const siteUrl = getSiteUrl();
  const items = session.line_items?.data || [];
  const firstName = session.customer_details?.name?.split(' ')?.[0] || 'there';

  const itemsRows = items
    .map(
      (li) => `
        <tr>
          <td style="padding: 14px 0; border-bottom: 1px solid ${BRAND.line}; color: ${BRAND.cream}; font-family: ${BRAND.bodyFont}; font-size: 14px;">
            ${li.description}${li.quantity > 1 ? ` &nbsp;×&nbsp; ${li.quantity}` : ''}
          </td>
          <td style="padding: 14px 0; border-bottom: 1px solid ${BRAND.line}; color: ${BRAND.creamDim}; font-family: ${BRAND.bodyFont}; font-size: 14px; text-align: right; white-space: nowrap;">
            ${formatMoney(li.amount_total, session.currency)}
          </td>
        </tr>`
    )
    .join('');

  const shipping = session.shipping_details;
  const address = shipping?.address;
  const addressBlock = address
    ? `${shipping.name || ''}<br/>${address.line1 || ''}${address.line2 ? ', ' + address.line2 : ''}<br/>${address.city || ''} ${address.postal_code || ''}<br/>${address.country || ''}`
    : null;

  return `<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background-color:${BRAND.ink};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.ink};">
      <tr>
        <td align="center" style="padding: 48px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 520px;">

            <!-- Wordmark -->
            <tr>
              <td align="center" style="padding-bottom: 40px;">
                <span style="font-family: ${BRAND.headingFont}; font-size: 22px; letter-spacing: 4px; color: ${BRAND.cream}; text-transform: uppercase;">VIITALON</span>
              </td>
            </tr>

            <!-- Card -->
            <tr>
              <td style="background-color:${BRAND.inkSurface}; border: 1px solid ${BRAND.line}; border-radius: 2px; padding: 40px 36px;">

                <p style="margin:0 0 6px; font-family: ${BRAND.bodyFont}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${BRAND.vitalBright};">
                  Order Confirmed
                </p>
                <h1 style="margin: 0 0 16px; font-family: ${BRAND.headingFont}; font-weight: normal; font-size: 28px; line-height: 1.25; color: ${BRAND.cream};">
                  Thank you, ${firstName}.
                </h1>
                <p style="margin: 0 0 32px; font-family: ${BRAND.bodyFont}; font-size: 14px; line-height: 1.6; color: ${BRAND.ash};">
                  Your order has been received and is being prepared. We'll follow up once it's on its way.
                </p>

                <!-- Line items -->
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
                  ${itemsRows}
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
                  <tr>
                    <td style="padding-top: 12px; font-family: ${BRAND.bodyFont}; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${BRAND.ash};">
                      Total
                    </td>
                    <td style="padding-top: 12px; font-family: ${BRAND.headingFont}; font-size: 20px; color: ${BRAND.cream}; text-align: right;">
                      ${formatMoney(session.amount_total, session.currency)}
                    </td>
                  </tr>
                </table>

                ${
                  addressBlock
                    ? `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px; border-top: 1px solid ${BRAND.line}; padding-top: 24px;">
                  <tr>
                    <td style="font-family: ${BRAND.bodyFont}; font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${BRAND.ash}; padding-bottom: 8px;">
                      Shipping To
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: ${BRAND.bodyFont}; font-size: 14px; line-height: 1.6; color: ${BRAND.creamDim};">
                      ${addressBlock}
                    </td>
                  </tr>
                </table>`
                    : ''
                }

              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding-top: 32px;">
                <a href="${siteUrl}/shop" style="display:inline-block; font-family: ${BRAND.bodyFont}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${BRAND.vitalBright}; text-decoration: none; border: 1px solid ${BRAND.vitalBright}; padding: 14px 32px; border-radius: 2px;">
                  Continue Shopping
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding-top: 40px;">
                <p style="margin:0; font-family: ${BRAND.bodyFont}; font-size: 12px; line-height: 1.6; color: ${BRAND.ash};">
                  Questions about your order? Reply to this email or contact us at
                  <a href="mailto:support@viitalon.com" style="color:${BRAND.creamDim};">support@viitalon.com</a>.
                </p>
                <p style="margin: 16px 0 0; font-family: ${BRAND.bodyFont}; font-size: 11px; letter-spacing: 1px; color: ${BRAND.ash};">
                  VIITALON &nbsp;·&nbsp; New Zealand
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendCustomerConfirmation(session) {
  const customerEmail = session.customer_details?.email;
  if (!customerEmail) {
    console.warn('No customer email on session — skipping customer confirmation.');
    return;
  }

  await sendViaResend({
    from: process.env.ORDER_NOTIFICATION_FROM || 'orders@viitalon.com',
    to: customerEmail,
    subject: `Your VIITALON order is confirmed`,
    html: renderCustomerEmail(session),
  });
}

// ---------------------------------------------------------------------------
// Merchant-facing new-order notification
// ---------------------------------------------------------------------------

async function sendMerchantNotification(session) {
  // Every completed order goes to Viitalon (for records) and to the
  // fulfilment supplier at sales@edh.nz (so they can pack & ship
  // directly) in the same email. Add more addresses to
  // ORDER_NOTIFICATION_EMAIL (comma-separated) if needed later.
  const internalRecipients = (process.env.ORDER_NOTIFICATION_EMAIL || 'info@viitalon.com')
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean);
  const supplierRecipients = (process.env.SUPPLIER_NOTIFICATION_EMAIL || 'sales@edh.nz')
    .split(',')
    .map((addr) => addr.trim())
    .filter(Boolean);
  const notifyTo = [...new Set([...internalRecipients, ...supplierRecipients])];
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

  await sendViaResend({
    from: fromAddress,
    to: notifyTo,
    subject: `New order — ${formatMoney(session.amount_total, session.currency)}`,
    html,
  });
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

      // Send sequentially, not concurrently — firing both at once can trip
      // Resend's per-second rate limit and cause one to silently fail.
      try {
        await sendCustomerConfirmation(session);
        console.log('Customer confirmation email sent for session', session.id);
      } catch (err) {
        console.error('Customer confirmation email FAILED for session', session.id, '—', err);
      }

      // Small gap before the second send, as extra insurance against
      // Resend's per-second rate limit on top of sending sequentially.
      await new Promise((resolve) => setTimeout(resolve, 600));

      try {
        await sendMerchantNotification(session);
        console.log('Merchant notification email sent for session', session.id);
      } catch (err) {
        console.error('Merchant notification email FAILED for session', session.id, '—', err);
      }
    } catch (err) {
      // Log and swallow — Stripe retries the webhook on non-2xx responses,
      // and we don't want an email hiccup to trigger repeated retries.
      console.error('Failed to process checkout.session.completed:', err);
    }
  }

  return res.status(200).json({ received: true });
}

