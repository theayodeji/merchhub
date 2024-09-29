import React from 'react';

const Button = ({ variant = 'primary', children, otherStyles }) => {
  const baseStyles = 'px-4 py-3 text-sm font-semibold rounded-lg focus:outline-none';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-red-500 text-white hover:bg-red-400';
      break;
    case 'secondary':
      variantStyles = 'bg-black text-white hover:bg-[#191919] ';
      break;
    case 'outline':
      variantStyles = 'bg-transparent border-2 border-red-500 text-gray-500 hover:bg-gray-100 hover:border-none focus:ring-gray-300';
      break;
    case 'outline-light':
      variantStyles = 'bg-transparent border-[2px] border-solid border-white text-white hover:bg-white hover:border-opacity-0 hover:text-black';
      break;
    case 'danger':
      variantStyles = 'bg-red-500 text-white hover:bg-red-600';
      break;
    default:
      variantStyles = 'bg-red-500 text-white hover:bg-blue-600';
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${otherStyles} transition-all duration-300 ease-out`}>
      {children}
    </button>
  );
};

export default Button;
