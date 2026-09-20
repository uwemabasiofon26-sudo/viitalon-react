import { useEffect } from "react";
import { SITE_URL, SITE_NAME } from "@/lib/brand";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Sets per-page <title>, meta description, canonical link, Open Graph /
 * Twitter Card tags, robots directive, and (optionally) a JSON-LD
 * structured-data block — all via direct DOM updates, so no extra
 * dependency (react-helmet etc.) is required.
 *
 * This is a client-side-rendered SPA, so these updates only reach crawlers
 * that execute JavaScript (Googlebot, Bingbot, and most modern AI
 * crawlers/browsing agents do). index.html carries strong static
 * fallback tags for anything that only reads the initial HTML.
 *
 * @param {object} opts
 * @param {string} opts.title - Page title (site name is appended automatically).
 * @param {string} opts.description - Meta description (~150-160 chars ideal).
 * @param {string} opts.path - Path for the canonical/OG URL, e.g. "/shop".
 * @param {string} [opts.image] - Absolute image URL for social previews.
 * @param {"website"|"product"|"article"} [opts.type] - og:type.
 * @param {boolean} [opts.noindex] - Set true for cart/checkout/thank-you pages.
 * @param {object|object[]} [opts.structuredData] - JSON-LD object(s) to inject.
 */
export function useSEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  structuredData = null,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    const url = `${SITE_URL}${path}`;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:site_name", SITE_NAME);

    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    upsertCanonical(url);
    upsertStructuredData(structuredData);

    // No cleanup: the next page's useSEO call overwrites these same tags,
    // so there's never a stale flash between routes in this SPA.
  }, [title, description, path, image, type, noindex, structuredData]);
}

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(url) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

function upsertStructuredData(data) {
  const existing = document.getElementById("page-structured-data");
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "page-structured-data";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}
