import React from 'react';
import Hero from '@/components/home/Hero';
import BrandStory from '@/components/home/BrandStory';
import ProductShowcase from '@/components/home/ProductShowcase';
import WhyViitalon from '@/components/home/WhyViitalon';
import ComingSoon from '@/components/home/ComingSoon';
import IngredientSpotlight from '@/components/home/IngredientSpotlight';
import BlogTeaser from '@/components/home/BlogTeaser';

export default function Home() {
  return (
    <>
      <Hero />
      <BrandStory />
      <ProductShowcase />
      <WhyViitalon />
      <ComingSoon />
      <IngredientSpotlight />
      <BlogTeaser />
    </>
  );
}
