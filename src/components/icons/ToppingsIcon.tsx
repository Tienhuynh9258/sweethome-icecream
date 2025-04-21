import React from 'react';

export const ToppingsIcon = ({ className = "", size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="7" cy="8" r="2" fill="#FF9800" /> {/* Orange sprinkle */}
      <circle cx="12" cy="6" r="2" fill="#E91E63" /> {/* Pink sprinkle */}
      <circle cx="17" cy="8" r="2" fill="#8BC34A" /> {/* Green sprinkle */}
      <circle cx="9" cy="12" r="2" fill="#9C27B0" /> {/* Purple sprinkle */}
      <circle cx="15" cy="12" r="2" fill="#2196F3" /> {/* Blue sprinkle */}
      <path
        d="M5 16H19C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17C4 16.4477 4.44772 16 5 16Z"
        fill="#795548"
      />
    </svg>
  );
};

export default ToppingsIcon; 