import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { BLOG_POSTS } from '@/lib/blogData';

export default function Blog() {
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [featured, setFeatured] = useState(BLOG_POSTS[0]);

  useEffect(() => {
    base44.entities.BlogPost.list('display_order', 20)
      .then(data => {
        if (data && data.length > 0) {
          setPosts(data);
          setFeatured(data[0]);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="pt-40 md:pt-48">
      {/* Header */}
      <section className="px-6 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="eyebrow mb-3">The Journal</div>
          <h1 className="font-display font-light text-5xl md:text-7xl text-cream leading-tight">
            Knowledge,<br />not noise.
          </h1>
          <p className="text-ash mt-6 max-w-xl text-base md:text-lg">
            Training protocols, ingredient breakdowns, and the science behind every formula. No filler — just what you need to know.
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section className="px-6 pb-16 border-b border-line">
        <div className="max-w-7xl mx-auto">
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 md:gap-12 bg-ink-surface border border-line rounded-sm overflow-hidden hover:border-vital transition-colors"
          >
            <div className="aspect-[16/10] md:aspect-auto bg-ink-deep overflow-hidden relative">
              {featured.image_url ? (
                <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-vital-dim/20 blur-2xl" />
                </div>
              )}
              <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                <span className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">Featured</span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">{featured.category}</span>
                <span className="font-mono text-[10px] tracking-widest uppercase text-ash">{featured.read_time}</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-cream leading-tight mb-4 group-hover:text-vital-bright transition-colors">
                {featured.title}
              </h2>
              <p className="text-ash leading-relaxed mb-6">{featured.excerpt}</p>
              <span className="font-mono text-xs tracking-widest uppercase text-vital-bright">
                Read Article →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Article grid */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Link
                key={post.id || i}
                to={`/blog/${post.slug}`}
                className="group block bg-ink-surface border border-line rounded-sm overflow-hidden hover:border-vital transition-colors"
              >
                <div className="aspect-[3/2] bg-ink-deep overflow-hidden relative">
                  {post.image_url ? (
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-vital-dim/20 blur-xl" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-ink/80 backdrop-blur-sm px-3 py-1 rounded-sm">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-vital-bright">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="font-mono text-[10px] tracking-widest uppercase text-ash mb-3">{post.read_time}</div>
                  <h3 className="font-display text-xl text-cream leading-tight mb-3 group-hover:text-vital-bright transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ash text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
