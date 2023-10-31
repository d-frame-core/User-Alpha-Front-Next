/** @format */
'use client';
import Sidebar from '@/components/Sidebar';
import SitesByTimes from '@/components/SitesByTimes';
import SitesByVisits from '@/components/SitesByVisits';
import React, { useState } from 'react';

export default function Analytics() {
  const [toggleMenu, setToggleMenu] = useState('sites-by-visits');
  let contentComponent;

  // Depending on the value of toggleMenu, set the contentComponent to the appropriate component
  if (toggleMenu === 'sites-by-visits') {
    contentComponent = <SitesByVisits />;
  } else if (toggleMenu === 'sites-by-time') {
    contentComponent = <SitesByTimes />;
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col md:justify-between w-4/5 mx-auto mt-16 pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-full border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'sites-by-visits'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('sites-by-visits')}>
            Sites by Visits
          </div>
          <div
            className={`w-full border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'sites-by-time'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('sites-by-time')}>
            Sites by Time
          </div>
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[40vh] md:mt-0 mt-24'>
          {contentComponent}
        </div>
      </div>
    </div>
  );
}
