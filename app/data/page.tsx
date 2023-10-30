/** @format */
'use client';
import BrowserData from '@/components/BrowserData';
import CallData from '@/components/CallData';
import EmailData from '@/components/EmailData';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

export default function Data() {
  const [toggleMenu, setToggleMenu] = useState('browser-data');
  let contentComponent;

  // Depending on the value of toggleMenu, set the contentComponent to the appropriate component
  if (toggleMenu === 'browser-data') {
    contentComponent = <BrowserData />;
  } else if (toggleMenu === 'email-data') {
    contentComponent = <EmailData />;
  } else if (toggleMenu === 'call-data') {
    contentComponent = <CallData />;
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col justify-between w-4/5 mx-auto mt-16 pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'browser-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('browser-data')}>
            Browser Data
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'email-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('email-data')}>
            Email Data
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'call-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('call-data')}>
            Call Data
          </div>
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[70vh]'>
          {contentComponent}
        </div>
      </div>
    </div>
  );
}
