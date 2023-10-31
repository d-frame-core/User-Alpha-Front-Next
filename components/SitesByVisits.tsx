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
  const { userWalletAddress, userToken } = useContext(AppContext);
  const walletAddress =
    userWalletAddress || window.localStorage.getItem('userPublicAddress');

  async function fetchTopSitesByVisits() {
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    toast.loading('Fetching top Sites', { id: '1' });
    await fetch(
      `http://localhost:8080/user/api/user-data/top-sites/${walletAddress}`,
      {
        method: 'GET',
        cache: 'force-cache',

        headers: { Authorization: `${userAccessToken}` },
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
      <div className='md:text-3xl text-4xl font-semibold'>
        Top Sites Visited
      </div>
      {topSitesByVisits && (
        <div className='md:-mt-5 md:block hidden'>
          {Charts(topSitesByVisits as any[], 'visits', h, w, ma)}
        </div>
      )}
      <div className='bg-white h-[30vh] md:mt-3 mt-10 text-sm w-full overflow-y-auto'>
        {topSitesByVisits &&
          topSitesByVisits.map((item: any) => (
            <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
              <div>{item.name}</div>
              <div>{item.visits} Times</div>
            </div>
          ))}
      </div>
    </div>
  );
}
