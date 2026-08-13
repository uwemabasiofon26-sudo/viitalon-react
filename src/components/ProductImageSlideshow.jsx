import React, { useState, useEffect, useMemo } from 'react';
import SignalLine from './SignalLine';

export default function ProductImageSlideshow({ images = [], fallbackImage, alt, signalPath, signalLabel, showFull = false, aspectClass }) {
  const [current, setCurrent] = useState(0);
  const [broken, setBroken] = useState({});

  const candidateImages = useMemo(() => images.filter(Boolean), [images]);
  const workingImages = candidateImages.filter((url) => !broken[url]);

  // If every dedicated view image is missing/broken, fall back to showing
  // just the single main product photo instead of an empty box.
  const validImages = workingImages.length > 0
    ? workingImages
    : (fallbackImage && !broken[fallbackImage] ? [fallbackImage] : []);

  const count = validImages.length;

  const handleError = (url) => {
    setBroken((prev) => (prev[url] ? prev : { ...prev, [url]: true }));
  };

  useEffect(() => {
    if (current >= count) setCurrent(0);
  }, [count, current]);

  useEffect(() => {
    if (count <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(interval);
  }, [count]);

  if (count === 0) return null;

  return (
    <>
      <div
        className={`${
          aspectClass || (showFull ? 'aspect-[16/10]' : 'aspect-[3/4]')
        } bg-ink-surface border border-line rounded-sm overflow-hidden relative`}
      >
        {validImages.map((url, i) => (
          <img
            key={url}
            src={url}
            alt={alt}
            onError={() => handleError(url)}
            className={`absolute inset-0 w-full h-full transition-all duration-[1500ms] ease-in-out ${
              showFull ? 'object-contain p-4' : 'object-cover'
            } ${
              i === current ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/60 via-transparent to-transparent" />
        {signalPath && (
          <div className="absolute bottom-6 left-6 right-6 h-8">
            <SignalLine path={signalPath} className="w-full h-full" />
          </div>
        )}
        {count > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {validImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-vital-bright w-6' : 'bg-cream/30 w-1.5'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      {signalLabel && (
        <div className="font-mono text-[10px] tracking-widest uppercase text-ash mt-3 text-center">
          {signalLabel}
        </div>
      )}
    </>
  );
}
