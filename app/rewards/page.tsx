/** @format */
'use client';
import DailyRewards from '@/components/DailyRewards';
import MonthlyRewards from '@/components/MonthlyRewards';
import Navbar from '@/components/Navbar';
import Modal from '@/components/RewardsModal';
import Sidebar from '@/components/Sidebar';
import WeeklyRewards from '@/components/WeeklyRewards';
import React, { useState } from 'react';

export default function Rewards() {
  const [toggleMenu, setToggleMenu] = useState('daily');
  const [modalOpen, setModalOpen] = useState(false);
  let contentComponent;

  // Depending on the value of toggleMenu, set the contentComponent to the appropriate component
  if (toggleMenu === 'daily') {
    contentComponent = <DailyRewards />;
  } else if (toggleMenu === 'weekly') {
    contentComponent = <WeeklyRewards />;
  } else if (toggleMenu === 'monthly') {
    contentComponent = <MonthlyRewards />;
  }
  return (
    <div className='flex'>
      <Sidebar />
      <Navbar />
      <div className='flex flex-col md:justify-between w-4/5 mx-auto mt-16 pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-full border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'daily'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('daily')}>
            Daily Rewards
          </div>
          <div
            className={`w-full border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'weekly'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('weekly')}>
            Weekly Rewards
          </div>
          <div
            className={`w-full border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'monthly'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('monthly')}>
            Monthly Rewards
          </div>
        </div>
        <div
          className='text-left ml-14 cursor-pointer py-1 text-xl font-semibold bg-blue-900 text-white w-fit px-2 rounded'
          onClick={() => setModalOpen(true)}>
          Request Rewards Payout
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[80vh] md:mt-0 mt-24'>
          {contentComponent}
        </div>
      </div>
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  );
}
