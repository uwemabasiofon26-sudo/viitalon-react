import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { BLOG_POSTS } from '@/lib/blogData';

export default function BlogTeaser() {
  const [posts, setPosts] = useState(BLOG_POSTS.slice(0, 3));

  useEffect(() => {
    base44.entities.BlogPost.list('display_order', 3)
      .then(data => {
        if (data && data.length > 0) setPosts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 border-t border-line">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow mb-3">The Journal</div>
            <h2 className="font-display font-light text-4xl md:text-6xl text-cream leading-tight">
              Knowledge, not noise.
            </h2>
          </div>
          <Link
            to="/blog"
            className="font-mono text-xs tracking-widest uppercase text-vital-bright hover:text-cream transition-colors"
          >
            All Articles →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link
              key={post.id || i}
              to={`/blog/${post.slug}`}
              className="group block bg-ink-surface border border-line rounded-sm overflow-hidden hover:border-vital transition-colors"
            >
              <div className="aspect-[3/2] bg-ink-deep overflow-hidden relative">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                      post.slug === 'viitalon-built-for-energy-performance-recovery'
                        ? 'object-contain p-3'
                        : 'object-cover'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-vital-dim/20 blur-xl" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-3">
                  {post.read_time}
                </div>
                <h3 className="font-display text-xl text-cream leading-tight mb-3 group-hover:text-vital-bright transition-colors">
                  {post.title}
                </h3>
                <p className="text-ash text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
