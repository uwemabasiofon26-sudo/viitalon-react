// Vercel serverless function — GET /api/checkout-session?session_id=...
//
// Retrieves a completed Stripe Checkout Session so the success page can
// show the customer an order summary.

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Stripe is not configured.' });
  }

  const { session_id } = req.query;
  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id.' });
  }

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'customer'],
    });

    return res.status(200).json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      line_items: session.line_items?.data?.map((li) => ({
        description: li.description,
        quantity: li.quantity,
        amount_total: li.amount_total,
      })),
    });
  } catch (err) {
    console.error('Stripe session retrieve error:', err);
    return res.status(500).json({ error: err.message || 'Unable to retrieve order.' });
  }
}
