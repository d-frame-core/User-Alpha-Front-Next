/** @format */

import React from 'react';

interface ButtonProps {
  content: any;
  onClick: any;
}

const Button: React.FC<ButtonProps> = ({ content, onClick }) => {
  return (
    <button
      className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
