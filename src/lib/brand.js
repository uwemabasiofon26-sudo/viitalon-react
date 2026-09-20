import korzavoLogo from "@/assets/brand/korzavo-logo.png";

export const LOGO_URL = korzavoLogo;
export const CURRENCY = "NZD";
// Domain stays alphavalour.com for now — the company plans to change the
// domain separately later. Only the brand/display name is changing here.
export const SITE_URL = "https://alphavalour.com";
export const SITE_NAME = "Korzavo";
export const BRAND_TAGLINE = "Performance Nutrition & Supplements";

export const formatNZD = (n) => `$${Number(n || 0).toFixed(2)}`;

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Performance Nutrition", to: "/performance-nutrition" },
  { label: "The Stack", to: "/stack" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
