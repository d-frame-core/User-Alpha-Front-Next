/** @format */

import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function Rewards() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-28 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[70vh]'>
        <div className='w-full'>
          <h1 className='text-3xl font-semibold mb-4'>Rewards</h1>
          <div className='overflow-y-auto h-[90%] min-h-full'></div>
        </div>
      </div>
    </div>
  );
}
