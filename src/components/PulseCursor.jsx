import React, { useEffect, useState } from 'react';

export default function PulseCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Disable on touch / small screens
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: pos.x,
        top: pos.y,
        transform: 'translate(-50%, -50%)',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(168,0,26,0.08) 0%, transparent 70%)',
        transition: 'opacity 0.3s ease',
        mixBlendMode: 'screen',
      }}
    />
  );
}
