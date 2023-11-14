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
    userWalletAddress ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('userPublicAddress'));

  async function fetchTopSitesByVisits() {
    const userAccessToken =
      userToken ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userAccessToken'));
    toast.loading('Fetching top Sites', { id: '1' });
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/user-data/top-sites/${walletAddress}`,
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
    <div className='flex flex-col justify-between w-full gap-4'>
      <div className='md:text-3xl text-4xl font-semibold'>
        Top Sites Visited
      </div>
      {topSitesByVisits.length > 0 ? (
        <>
          <div className='md:-mt-5 ml-[10%] md:block hidden'>
            {Charts(topSitesByVisits as any[], 'visits', h, w, ma)}
          </div>
          <div className='bg-white text-sm w-full overflow-y-auto'>
            {topSitesByVisits &&
              topSitesByVisits.map((item: any) => (
                <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
                  <div>{item.name}</div>
                  <div>{item.visits} Times</div>
                </div>
              ))}
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
