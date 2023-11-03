/** @format */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import Charts from './Charts';
import { AppContext } from '@/context/Context';
import { useMediaQuery } from '@mui/material';
import toast from 'react-hot-toast';

export default function SitesByVisits() {
  const ma = useMediaQuery('(min-width:880px)');
  var h: number = 240;
  var w: number = 650;
  const [topSitesByTime, setTopSitesByTime] = useState([]);
  const { userWalletAddress, userToken } = useContext(AppContext);
  const walletAddress =
    userWalletAddress || window.localStorage.getItem('userPublicAddress');

  async function fetchTopSitesByTime() {
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    toast.loading('Fetching top Sites', { id: '1' });
    await fetch(
      `http://localhost:8080/user/api/user-data/top-times/${walletAddress}`,
      {
        method: 'GET',
        cache: 'no-cache',

        headers: { Authorization: `${userAccessToken}` },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTopSitesByTime(data);
        toast.success('Fetched top Sites', { id: '1' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error Fetching top Sites', { id: '1' });
      });
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  useEffect(() => {
    fetchTopSitesByTime();
  }, []);

  function formatTime(milliseconds: number) {
    const seconds = milliseconds / 1000;
    if (seconds < 60) {
      return `${seconds.toFixed(2)} second${seconds !== 1 ? 's' : ''}`;
    } else if (seconds < 3600) {
      const minutes = seconds / 60;
      return `${minutes.toFixed(2)} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      const hours = seconds / 3600;
      return `${hours.toFixed(2)} hour${hours !== 1 ? 's' : ''}`;
    }
  }
  return (
    <div className='flex flex-col w-full'>
      <div className='md:text-3xl text-4xl font-semibold'>
        Top Sites By Time
      </div>
      {topSitesByTime.length > 0 ? (
        <>
          <div className='md:-mt-5 md:block hidden'>
            {Charts(topSitesByTime as any[], 'time', h, w, ma)}
          </div>
          <div className='bg-white h-[30vh] md:mt-3 mt-10 w-full text-sm overflow-y-auto'>
            {topSitesByTime.map((item: any) => {
              const formattedTime = formatTime(item.time);
              return (
                <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
                  <div>{item.name}</div>
                  <div>{formattedTime}</div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className='w-full h-full flex justify-center items-center text-3xl'>
          **Minimum 6 hours of data needed**
        </div>
      )}
    </div>
  );
}
