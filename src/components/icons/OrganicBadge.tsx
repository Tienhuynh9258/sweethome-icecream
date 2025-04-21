import React from 'react';

export const OrganicBadge = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#8BC34A" />
      <path
        d="M12 6C14.5 6 17 7 17 10C17 13 14.5 14 12 14C9.5 14 7 13 7 10C7 7 9.5 6 12 6Z"
        fill="white"
      />
      <path
        d="M12 14C13.6569 14 15 15.3431 15 17C15 18.6569 13.6569 20 12 20C10.3431 20 9 18.6569 9 17C9 15.3431 10.3431 14 12 14Z"
        fill="white"
      />
      <text
        x="12"
        y="11"
        textAnchor="middle"
        fontSize="3"
        fill="#8BC34A"
        fontWeight="bold"
      >
        100%
      </text>
      <text
        x="12"
        y="18"
        textAnchor="middle"
        fontSize="3"
        fill="#8BC34A"
        fontWeight="bold"
      >
        ORGANIC
      </text>
    </svg>
  );
};

export default OrganicBadge; 