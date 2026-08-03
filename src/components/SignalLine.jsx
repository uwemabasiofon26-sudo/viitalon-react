import React from 'react';

export default function SignalLine({ path, className = '', animated = true, color = '#a8001a' }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d={path}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'pulse-path' : ''}
        style={animated ? {} : { strokeDasharray: 'none', strokeDashoffset: '0' }}
      />
    </svg>
  );
}
