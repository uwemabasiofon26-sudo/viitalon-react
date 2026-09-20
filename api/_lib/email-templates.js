// Shared branded HTML email templates. Email clients need inline styles —
// no Tailwind/external CSS reaches them.

const BRAND = {
  bg: "#0A2426",
  card: "#0F2E31",
  gold: "#F0DDBC",
  text: "#E8E9EA",
  muted: "#9FB0B0",
};

function wrapper(innerHtml) {
  return `
  <div style="background:${BRAND.bg};padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
    <div style="max-width:560px;margin:0 auto;background:${BRAND.card};border:1px solid rgba(240,221,188,0.2);border-radius:8px;overflow:hidden;">
      <div style="padding:28px 32px;border-bottom:1px solid rgba(240,221,188,0.2);">
        <span style="color:${BRAND.gold};font-size:20px;font-weight:bold;letter-spacing:2px;">KORZAVO</span>
      </div>
      <div style="padding:32px;color:${BRAND.text};">
        ${innerHtml}
      </div>
      <div style="padding:20px 32px;border-top:1px solid rgba(240,221,188,0.2);color:${BRAND.muted};font-size:11px;letter-spacing:1px;text-transform:uppercase;">
        Fuel Your Strength · Elevate Your Performance
      </div>
    </div>
  </div>`;
}

function formatNZD(n) {
  return `$${Number(n || 0).toFixed(2)}`;
}

function lineItemsHtml(items) {
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(240,221,188,0.15);color:${BRAND.text};font-size:14px;">
          ${i.name}${i.quantity > 1 ? ` × ${i.quantity}` : ""}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(240,221,188,0.15);color:${BRAND.gold};font-size:14px;text-align:right;">
          ${formatNZD(i.amount)}
        </td>
      </tr>`
    )
    .join("");
}

export function customerOrderEmail({ customerName, items, total, orderId }) {
  const inner = `
    <h1 style="font-size:22px;margin:0 0 8px;">Order confirmed${customerName ? `, ${customerName}` : ""}!</h1>
    <p style="color:${BRAND.muted};font-size:14px;line-height:1.6;margin:0 0 24px;">
      Thanks for your order. Here's a summary of what's on its way.
    </p>
    <table style="width:100%;border-collapse:collapse;">
      ${lineItemsHtml(items)}
      <tr>
        <td style="padding:14px 0 0;font-weight:bold;color:${BRAND.text};">Total</td>
        <td style="padding:14px 0 0;font-weight:bold;color:${BRAND.gold};text-align:right;">${formatNZD(total)}</td>
      </tr>
    </table>
    ${orderId ? `<p style="color:${BRAND.muted};font-size:12px;margin-top:24px;">Order reference: ${orderId}</p>` : ""}
    <p style="color:${BRAND.muted};font-size:13px;margin-top:24px;">
      Questions about your order? Reply to this email or contact
      <a href="mailto:support@alphavalour.com" style="color:${BRAND.gold};">support@alphavalour.com</a>.
    </p>`;
  return wrapper(inner);
}

export function companyOrderNotificationEmail({ customerName, customerEmail, items, total, orderId }) {
  const inner = `
    <h1 style="font-size:20px;margin:0 0 16px;">New order placed</h1>
    <p style="font-size:14px;margin:4px 0;"><strong>Customer:</strong> ${customerName || "—"} (${customerEmail || "—"})</p>
    ${orderId ? `<p style="font-size:14px;margin:4px 0;"><strong>Order reference:</strong> ${orderId}</p>` : ""}
    <table style="width:100%;border-collapse:collapse;margin-top:16px;">
      ${lineItemsHtml(items)}
      <tr>
        <td style="padding:14px 0 0;font-weight:bold;">Total</td>
        <td style="padding:14px 0 0;font-weight:bold;color:${BRAND.gold};text-align:right;">${formatNZD(total)}</td>
      </tr>
    </table>`;
  return wrapper(inner);
}

export function subscriberWelcomeEmail() {
  const inner = `
    <h1 style="font-size:22px;margin:0 0 8px;">You're on the list.</h1>
    <p style="color:${BRAND.muted};font-size:14px;line-height:1.6;">
      Thanks for subscribing to Korzavo. Expect product drops, training insights and subscriber-only offers straight to your inbox.
    </p>`;
  return wrapper(inner);
}

export function companySubscriberNotificationEmail({ email }) {
  const inner = `
    <h1 style="font-size:20px;margin:0 0 12px;">New newsletter subscriber</h1>
    <p style="font-size:14px;">${email}</p>`;
  return wrapper(inner);
}
