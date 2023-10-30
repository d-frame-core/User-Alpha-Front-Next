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
  const [topSitesByVisits, setTopSitesByVisits] = useState([]);
  const { userWalletAddress } = useContext(AppContext);
  const walletAddress =
    userWalletAddress || window.localStorage.getItem('userPublicAddress');

  async function fetchTopSitesByVisits() {
    toast.loading('Fetching top Sites', { id: '1' });
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/user-data/top-sites/${walletAddress}`,
      {
        method: 'GET',
        cache: 'force-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTopSitesByVisits(data);
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
    fetchTopSitesByVisits();
  }, []);
  return (
    <div className='flex flex-col w-full'>
      <div className='text-3xl font-semibold'>Top Sites Visited</div>
      {topSitesByVisits && (
        <div className='md:-mt-5 md:block hidden'>
          {Charts(topSitesByVisits as any[], 'visits', h, w, ma)}
        </div>
      )}
      <div className='bg-white h-[30vh] mt-3 text-sm w-full overflow-y-auto'>
        {topSitesByVisits &&
          topSitesByVisits.map((item: any) => (
            <div className='py-3 border-b-2 border-gray-200 flex items-center justify-between px-20'>
              <div>{item.name}</div>
              <div>{item.visits} Times</div>
            </div>
          ))}
      </div>
    </div>
  );
}
