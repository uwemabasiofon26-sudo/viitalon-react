import React from 'react';
import LegalContent, { LegalToc } from './LegalContent';

export default function LegalPageShell({ eyebrow, title, lastUpdated, intro, blocks }) {
  return (
    <div className="pt-40 md:pt-48">
      {/* Header */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">{eyebrow}</div>
          <h1 className="font-display font-light text-4xl md:text-6xl text-cream leading-tight">
            {title}
          </h1>
          <p className="font-mono text-xs tracking-widest uppercase text-ash mt-6">
            Last updated: {lastUpdated}
          </p>
          {intro && (
            <p className="text-ash mt-6 max-w-2xl text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 md:pb-32 border-t border-line">
        <div className="max-w-7xl mx-auto pt-16 grid lg:grid-cols-[220px_1fr] gap-16">
          <div className="hidden lg:block">
            <LegalToc blocks={blocks} />
          </div>
          <LegalContent blocks={blocks} />
        </div>
      </section>
    </div>
  );
}
