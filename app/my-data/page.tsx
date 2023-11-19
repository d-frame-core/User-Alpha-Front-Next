/** @format */
'use client';
import GcpData from '@/components/GcpData';
import IpfsData from '@/components/IpfsData';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

export default function MyData() {
  const [toggleMenu, setToggleMenu] = useState('gcp');
  let contentComponent;

  if (toggleMenu === 'gcp') {
    contentComponent = <GcpData />;
  } else if (toggleMenu === 'ipfs') {
    contentComponent = <IpfsData />;
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col md:justify-between w-4/5 mx-auto mt-16 md:pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'browser-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('browser-data')}>
            Google Cloud
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'email-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('email-data')}>
            IPFS
          </div>
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[40vh] md:mt-0 mt-16'>
          {contentComponent}
        </div>
      </div>
    </div>
  );
}
