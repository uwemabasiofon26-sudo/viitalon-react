import React from 'react';
import { Link } from 'react-router-dom';

// Simplified, on-brand 404 page.
// The original called base44's backend to check if the visitor was an
// admin (to show a note about unimplemented pages) — not needed for a
// standalone public storefront, so this version is a clean, static page
// styled to match the rest of the site.

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-ink-deep">
      <div className="max-w-md w-full text-center">
        <div className="font-display font-light text-7xl text-vital-bright mb-4">404</div>
        <div className="h-px w-16 bg-line mx-auto mb-8" />
        <h1 className="font-display text-2xl text-cream mb-3">Page Not Found</h1>
        <p className="text-ash leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-vital hover:bg-vital-bright text-cream font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
