/** @format */

'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/Context';
import Navbar from './Navbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import KeyIcon from '@mui/icons-material/Key';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PollIcon from '@mui/icons-material/Poll';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DataObjectIcon from '@mui/icons-material/DataObject';
const Sidebar: React.FC = () => {
  const router = useRouter();
  const { toggleTab, setToggleTab } = useContext(AppContext);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const help = () => {
    setToggleTab('help');
    router.push('/help');
  };

  const learnMore = () => {
    setToggleTab('learn-more');
    router.push('/learn-more');
  };

  return (
    // <div className='flex'>
    <div
      className={`bg-gradient-to-b from-[rgba(92,15,255,.66)] to-pink-300 text-white h-screen  ${
        menuOpen ? 'md:w-[18%] w-[50vw]' : 'md:w-[18%] w-0'
      } `}>
      {/* Hamburger Icon (visible on mobile screens) */}
      <div className='md:hidden'>
        <button
          onClick={toggleMenu}
          className='text-white text-4xl font-extrabold'>
          ☰
        </button>
      </div>

      {/* Top Section */}
      <div className={`mb-4 mt-0 p-0 ${menuOpen ? '' : 'hidden'}`}>
        <img
          src='/assets/dframe.png' // Use the relative path to the image
          alt='Background'
          className='mt-1 w-1/2 h-2/5 mx-auto object-cover'
        />
        <h2 className='text-2xl font-semibold text-center m-0 text-black'>
          D Frame
        </h2>
      </div>

      {/* Middle Section with specified background color (visible on medium and large screens) */}
      <div className={`mb-4 bg-blue-950 ${menuOpen ? '' : 'hidden'}`}>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('profile');
            router.push('/profile');
          }}>
          {toggleTab == 'profile' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <AccountCircleIcon />
              Profile
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <AccountCircleIcon />
              Profile
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('wallet');
            router.push('/wallet');
          }}>
          {toggleTab == 'wallet' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <AccountBalanceWalletIcon />
              Wallet
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <AccountBalanceWalletIcon />
              Wallet
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('permissions');
            router.push('/permissions');
          }}>
          {toggleTab == 'permissions' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <KeyIcon />
              Permissions
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <KeyIcon />
              Permissions
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('rewards');
            router.push('/rewards');
          }}>
          {toggleTab == 'rewards' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <MonetizationOnIcon />
              Rewards
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <MonetizationOnIcon />
              Rewards
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('analytics');
            router.push('/analytics');
          }}>
          {toggleTab == 'analytics' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <AutoGraphIcon />
              Analytics
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <AutoGraphIcon />
              Analytics
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 pt-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('survey');
            router.push('/survey');
          }}>
          {toggleTab == 'survey' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <PollIcon />
              Survey
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <PollIcon />
              Survey
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 py-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('data');
            router.push('/data');
          }}>
          {toggleTab == 'data' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <AdsClickIcon />
              Data
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <AdsClickIcon />
              Data
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 py-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('dex');
            router.push('/dex');
          }}>
          {toggleTab == 'dex' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <StorefrontIcon />
              Sell DFT
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <StorefrontIcon />
              Sell DFT
            </div>
          )}
        </div>
        <div
          className={`flex justify-start ml-6 py-2 mt-1 cursor-pointer`}
          onClick={() => {
            setToggleTab('my-data');
            router.push('/my-data');
          }}>
          {toggleTab == 'my-data' ? (
            <div className='bg-white w-full gap-4 rounded-l text-black flex justify-start pl-7 py-1'>
              <DataObjectIcon />
              Stored Data
            </div>
          ) : (
            <div className='pl-7 flex gap-4'>
              <DataObjectIcon />
              Stored Data
            </div>
          )}
        </div>
      </div>

      {/* Lower Section (visible on medium and large screens) */}
      <div className='bg-[#1B2B65] w-[85%] mx-auto mt-10 rounded-lg text-center text-white pb-2 hidden md:block'>
        <div className='relative'>
          <div className='m-auto absolute -top-4 left-[40%] bg-[#AABBFA] w-10 h-10 pt-[4px] rounded-full'>
            <div className='m-auto  bg-[#1B2B65] w-8 h-8 pt-[3px] text-[20px] rounded-full'>
              <p>?</p>
            </div>
          </div>
        </div>
        <p className='pt-8 text-sm'>Need Help with D Frame?</p>
        <div>
          <div
            className='rounded-lg text-sm px-2 py-1 mt-1 text-center text-white bg-[#017EFA] w-[80%] m-auto cursor-pointer'
            onClick={() => {
              setToggleTab('help');
              router.push('/help');
            }}>
            <p>Go to help center</p>
          </div>
        </div>
      </div>
      <div
        className='text-center underline mb-4 mt-4 cursor-pointer'
        onClick={() => {
          setToggleTab('learn-more');
          router.push('/learn-more');
        }}>
        Learn more
      </div>
      <Navbar />
      {/* <Navbar /> */}
    </div>
  );
};

export default Sidebar;
