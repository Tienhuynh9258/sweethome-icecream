import React from 'react';

export const IceCreamIcon = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 3C14.2091 3 16 4.79086 16 7C16 7.73638 15.7981 8.42343 15.4459 9.01465C16.3723 9.19466 17 10.0011 17 11C17 11.5523 16.5523 12 16 12H8C7.44772 12 7 11.5523 7 11C7 10.0011 7.62775 9.19466 8.55415 9.01465C8.20189 8.42343 8 7.73638 8 7C8 4.79086 9.79086 3 12 3Z"
        fill="#FF7043"
      />
      <path
        d="M8.5 12L12 21L15.5 12"
        stroke="#8D6E63"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IceCreamIcon; 