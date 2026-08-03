// This file replaces the original base44Client.js.
//
// The real base44Client.js connects to base44's private hosted backend
// (via @base44/sdk + appParams containing your app's private auth token).
// That backend is only reachable from inside the base44 platform, so it
// cannot work once this project runs independently (e.g. on Vercel).
//
// The good news: every page in this app was already written to gracefully
// fall back to static local data (see src/lib/productData.js) whenever a
// base44 call fails. So this stub simply makes every call reject
// immediately, which triggers that existing fallback behavior — no page
// logic needs to change.

const notAvailable = () => Promise.reject(new Error('base44 backend not available (running standalone)'));

export const base44 = {
  auth: {
    me: notAvailable,
    logout: () => {},
    redirectToLogin: () => {},
  },
  entities: {
    Product: {
      list: notAvailable,
      filter: notAvailable,
    },
    BlogPost: {
      list: notAvailable,
      filter: notAvailable,
    },
  },
};
