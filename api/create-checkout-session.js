// Vercel serverless function — POST /api/create-checkout-session
//
// Creates a Stripe Checkout Session for the items currently in the
// shopper's cart and returns the hosted Checkout URL to redirect to.
//
// Requires the STRIPE_SECRET_KEY environment variable to be set in the
// Vercel project (Project Settings -> Environment Variables). Never commit
// a real secret key to source control.

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({
      error: 'Stripe is not configured. Set STRIPE_SECRET_KEY in your Vercel project environment variables.',
    });
  }

  try {
    const stripe = new Stripe(secretKey);
    const { items = [], origin } = req.body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const siteUrl = origin || req.headers.origin || `https://${req.headers.host}`;

    const line_items = items.map((item) => ({
      price_data: {
        currency: 'nzd',
        product_data: {
          name: item.name,
          images: item.image_url ? [new URL(item.image_url, siteUrl).toString()] : undefined,
          metadata: item.slug ? { slug: item.slug } : undefined,
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.qty || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      currency: 'nzd',
      shipping_address_collection: {
        allowed_countries: ['NZ', 'AU', 'US', 'GB', 'CA'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'nzd' },
            display_name: 'Free shipping',
          },
        },
      ],
      // Stripe automatically emails a payment receipt to this address
      // once "Email customers for successful payments" is enabled in
      // Stripe Dashboard -> Settings -> Customer emails.
      customer_creation: 'always',
      success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout session error:', err);
    return res.status(500).json({ error: err.message || 'Unable to start checkout.' });
  }
}
