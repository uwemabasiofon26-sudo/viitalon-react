export async function startCheckout(items) {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((i) => ({
        name: i.name,
        slug: i.slug,
        price: i.price,
        qty: i.qty,
        image_url: i.image_url,
      })),
      origin: window.location.origin,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Unable to start checkout. Please try again.');
  }

  window.location.href = data.url;
}
