/** @format */

import React from 'react';
import Button from './Button';
interface KYC3DetailsProps {
  title: string;
  description: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: any;
}

const KYC3Details: React.FC<KYC3DetailsProps> = ({
  title,
  description,
  onChange,
  selectedFile,
}) => {
  return (
    <div className='w-full flex justify-start items-center md:my-5 my-6'>
      <div className='flex flex-col text-center md:w-[60%] w-[50%]'>
        <div className=' md:text-xl text-2xl font-semibold'>{title}</div>
        <div className='md:text-sm text-lg italic'>{description}</div>
      </div>
      <div className='md:w-[30%] w-[50%] text-center text-sm'>
        <label className='cursor-pointer bg-blue-400 hover:bg-blue-700 text-white font-bold md:py-2 md:px-4 p-2 rounded'>
          {selectedFile ? selectedFile.name : `Upload ${title}`}
          <input
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={onChange}
          />
        </label>
      </div>
    </div>
  );
};

export default KYC3Details;
