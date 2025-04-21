import React from 'react';

export const NaturalBadge = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#FF9800" />
      <path
        d="M7 12C7 9 9 7 12 7C15 7 17 9 17 12C17 15 15 17 12 17C9 17 7 15 7 12Z"
        fill="white"
      />
      <path
        d="M12 8C13.5 8 15 9 15 11C15 13 13.5 14 12 14C10.5 14 9 13 9 11C9 9 10.5 8 12 8Z"
        fill="#FF9800"
      />
      <path
        d="M8 11.5C8 10 9 9 10.5 9C12 9 13 10 13 11.5C13 13 12 14 10.5 14C9 14 8 13 8 11.5Z"
        fill="#FF9800"
      />
      <path
        d="M11 11.5C11 10 12 9 13.5 9C15 9 16 10 16 11.5C16 13 15 14 13.5 14C12 14 11 13 11 11.5Z"
        fill="#FF9800"
      />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="2.5"
        fill="white"
        fontWeight="bold"
      >
        NATURAL
      </text>
    </svg>
  );
};

export default NaturalBadge; 