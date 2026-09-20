// Vercel Serverless Function — newsletter signup. On each new subscriber:
//   1. Adds them to a Resend Audience (Resend holds the list, not us)
//   2. Sends them an immediate branded welcome email
//   3. Notifies your company inbox that someone subscribed
//
// Requires RESEND_API_KEY and RESEND_AUDIENCE_ID environment variables.
// FROM_EMAIL and COMPANY_EMAIL are also read from environment variables so
// you can change them in Vercel without touching code — see .env.example.
import { Resend } from "resend";
import { subscriberWelcomeEmail, companySubscriberNotificationEmail } from "./_lib/email-templates.js";

const FROM_EMAIL = process.env.ORDER_NOTIFICATION_FROM || "Korzavo <onboarding@resend.dev>";
const COMPANY_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL || "support@alphavalour.com";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Newsletter signup is not configured yet." });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
    } else {
      console.error("RESEND_AUDIENCE_ID not set — subscriber was not added to an audience.");
    }

    const welcomeResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "You're subscribed to Korzavo",
      html: subscriberWelcomeEmail(),
    });
    if (welcomeResult.error) {
      console.error("Resend welcome email error:", welcomeResult.error);
    }

    const notifyResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: COMPANY_EMAIL,
      subject: "New newsletter subscriber",
      html: companySubscriberNotificationEmail({ email }),
    });
    if (notifyResult.error) {
      console.error("Resend company-notification email error:", notifyResult.error);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("subscribe error:", err);
    return res.status(500).json({ error: "Could not subscribe right now. Please try again." });
  }
}
