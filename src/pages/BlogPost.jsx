import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { BLOG_POSTS_BY_SLUG } from '@/lib/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    base44.entities.BlogPost.filter({ slug })
      .then(data => {
        if (data && data.length > 0) {
          setPost(data[0]);
        } else {
          setPost(BLOG_POSTS_BY_SLUG[slug] || null);
        }
      })
      .catch(() => {
        setPost(BLOG_POSTS_BY_SLUG[slug] || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-line border-t-vital-bright rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-display text-3xl text-cream mb-4">Article not found</p>
        <Link to="/blog" className="font-mono text-xs tracking-widest uppercase text-vital-bright hover:text-cream transition-colors">
          ← Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-36 md:pt-40">
      <div className="px-6 py-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-ash hover:text-vital-bright transition-colors">
            <ArrowLeft size={12} /> Back to Journal
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">{post.category}</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-ash">{post.read_time}</span>
          </div>
          <h1 className="font-display font-light text-4xl md:text-6xl text-cream leading-tight">
            {post.title}
          </h1>
          <p className="text-ash mt-6 text-lg leading-relaxed">{post.excerpt}</p>
          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-line">
            <div className="w-8 h-8 rounded-full bg-vital-dim/30 flex items-center justify-center">
              <span className="font-mono text-[10px] text-vital-bright">V</span>
            </div>
            <div>
              <div className="font-mono text-xs text-cream">{post.author}</div>
              <div className="font-mono text-[10px] text-ash">{post.published_date}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Image */}
      {post.image_url && (
        <section className="px-6 mb-12">
          <div className="max-w-4xl mx-auto aspect-[16/9] bg-ink-surface border border-line rounded-sm overflow-hidden">
            <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </section>
      )}

      {/* Content */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert max-w-none">
            {post.content?.split('\n\n').map((para, i) => {
              if (para.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-display text-2xl md:text-3xl text-cream mt-10 mb-4">
                    {para.replace('## ', '')}
                  </h2>
                );
              }

              const renderInline = (text) =>
                text.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
                  chunk.startsWith('**') && chunk.endsWith('**') ? (
                    <strong key={j} className="text-cream font-semibold">{chunk.slice(2, -2)}</strong>
                  ) : (
                    <React.Fragment key={j}>{chunk}</React.Fragment>
                  )
                );

              const lines = para.split('\n');
              if (lines.every((line) => line.startsWith('- '))) {
                return (
                  <ul key={i} className="list-disc pl-5 text-cream-dim text-base md:text-lg leading-relaxed mb-6 space-y-1">
                    {lines.map((line, j) => (
                      <li key={j}>{renderInline(line.replace('- ', ''))}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="text-cream-dim text-base md:text-lg leading-relaxed mb-6">
                  {renderInline(para)}
                </p>
              );
            })}
          </div>

          {/* References */}
          {post.references && (
            <div className="mt-12 pt-8 border-t border-line">
              <div className="eyebrow mb-3">Scientific References</div>
              <p className="font-mono text-xs text-ash leading-relaxed">{post.references}</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-line">
        <div className="max-w-3xl mx-auto text-center">
          <div className="eyebrow mb-4">Ready to Train?</div>
          <h2 className="font-display font-light text-3xl md:text-5xl text-cream leading-tight mb-8">
            Find your formula.
          </h2>
          <Link
            to="/shop"
            className="inline-block bg-vital hover:bg-vital-bright text-cream font-mono text-xs tracking-widest uppercase px-8 py-4 rounded-sm transition-colors"
          >
            Shop the Range
          </Link>
        </div>
      </section>
    </div>
  );
}
