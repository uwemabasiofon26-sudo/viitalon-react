import React from 'react';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function LegalContent({ blocks }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2': {
            const id = slugify(block.text);
            return (
              <h2
                key={i}
                id={id}
                className="scroll-mt-32 font-display font-light text-2xl md:text-3xl text-cream mt-14 mb-5 pt-8 border-t border-line first:mt-0 first:pt-0 first:border-t-0"
              >
                {block.text}
              </h2>
            );
          }
          case 'h3':
            return (
              <h3
                key={i}
                className="font-mono text-xs tracking-widest uppercase text-vital-bright mt-8 mb-3"
              >
                {block.text}
              </h3>
            );
          case 'p':
            return (
              <p key={i} className="text-ash leading-relaxed mb-4 text-[15px] md:text-base">
                {block.text}
              </p>
            );
          case 'ul':
            return (
              <ul key={i} className="mb-5 space-y-2.5">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-ash leading-relaxed text-[15px] md:text-base">
                    <span className="text-vital-bright mt-1 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case 'contact':
            return (
              <div
                key={i}
                className="mb-5 bg-ink-surface border border-line rounded-sm px-5 py-4 text-cream-dim text-[15px] leading-relaxed"
              >
                {block.lines.map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export function LegalToc({ blocks }) {
  const headings = blocks.filter((b) => b.type === 'h2');
  return (
    <nav className="lg:sticky lg:top-32">
      <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-4">On this page</div>
      <ul className="space-y-2.5 border-l border-line pl-4">
        {headings.map((h, i) => (
          <li key={i}>
            <a
              href={`#${slugify(h.text)}`}
              className="text-cream-dim hover:text-vital-bright transition-colors text-sm leading-snug block"
            >
              {h.text.replace(/^\d+\.\s*/, '')}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
