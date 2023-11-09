/** @format */

import Image from 'next/image';
import React from 'react';

interface KYCSubmittedProps {
  level: number;
}

const KYCSubmitted: React.FC<KYCSubmittedProps> = ({ level }) => {
  return (
    <div className='w-full'>
      <h1 className='md:text-3xl font-semibold mb-4 text-5xl'>
        KYC Level-{level}
      </h1>
      <div
        className='flex flex-col gap-4 md:h-[70vh] h-[40vh] justify-center items-center md:text-3xl text-5xl text-center
                   '>
        <Image
          src={'/assets/success.svg'}
          width={150}
          height={200}
          alt='success'
          className='animate-bounce'
        />
        Your details are submitted
      </div>
    </div>
  );
};

export default KYCSubmitted;
