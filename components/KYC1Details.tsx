/** @format */

import React from 'react';

interface KYC1DetailsProps {
  title: string;
  onChange: (e: any) => void;
  placeHolder: string;
}

const KYC1Details: React.FC<KYC1DetailsProps> = ({
  title,
  onChange,
  placeHolder,
}) => {
  return (
    <div className='flex md:text-lg text-xl text-left md:my-3 my-6 items-center'>
      <div className='md:w-[25%] w-[50%]'>{title}</div>
      <div className='w-[5%]'>:</div>
      <div className='w-[50%] flex items-center justify-center'>
        <input
          className='rounded-lg w-full px-4 py-1 border-none outline-none'
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeHolder}
        />
      </div>
    </div>
  );
};

export default KYC1Details;
