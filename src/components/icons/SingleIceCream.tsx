import React from 'react';

export const SingleIceCream = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ice Cream Scoop */}
      <circle cx="12" cy="8" r="5" fill="#FFB6C1" /> {/* Light pink ice cream */}
      
      {/* Cone */}
      <path
        d="M7 12L12 20L17 12"
        stroke="#D2691E"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#DEB887"
      />
      
      {/* Waffle Pattern */}
      <path
        d="M9 14L15 14M10 16L14 16"
        stroke="#8B4513"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SingleIceCream; 