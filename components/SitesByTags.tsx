/** @format */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import Charts from './Charts';
import { AppContext } from '@/context/Context';
import { useMediaQuery } from '@mui/material';
import toast from 'react-hot-toast';

export default function SitesByTags() {
  const ma = useMediaQuery('(min-width:880px)');
  var h: number = 240;
  var w: number = 640;
  const [topSitesByTags, setTopSitesByTags] = useState([
    { name: 'binance.com', visits: 5 },
    { name: 'mexc.com', visits: 10 },
    { name: 'binance.com', visits: 5 },
    { name: 'mexc.com', visits: 10 },
    { name: 'mexc.com', visits: 10 },
  ]);
  const { userWalletAddress, userToken } = useContext(AppContext);
  const walletAddress =
    userWalletAddress || window.localStorage.getItem('userPublicAddress');

  const [toggleMenu, setToggleMenu] = useState('web3');

  useEffect(() => {
    if (toggleMenu === 'sports') {
      setTopSitesByTags([
        { name: 'ESPN', visits: 8 },
        { name: 'NFL.com', visits: 5 },
        { name: 'NBA.com', visits: 12 },
        { name: 'FIFA.com', visits: 7 },
        { name: 'Olympics.com', visits: 10 },
      ]);
    } else if (toggleMenu === 'social') {
      setTopSitesByTags([
        { name: 'Facebook', visits: 20 },
        { name: 'Twitter', visits: 18 },
        { name: 'Instagram', visits: 15 },
        { name: 'LinkedIn', visits: 12 },
        { name: 'Reddit', visits: 10 },
      ]);
    } else if (toggleMenu === 'food') {
      setTopSitesByTags([
        { name: 'FoodNetwork.com', visits: 7 },
        { name: 'AllRecipes.com', visits: 10 },
        { name: 'Epicurious.com', visits: 5 },
        { name: 'Tasty.co', visits: 8 },
        { name: 'SeriousEats.com', visits: 6 },
      ]);
    } else if (toggleMenu === 'crypto') {
      setTopSitesByTags([
        { name: 'Coinbase', visits: 15 },
        { name: 'Kraken', visits: 12 },
        { name: 'Binance', visits: 20 },
        { name: 'Bitfinex', visits: 8 },
        { name: 'Gemini', visits: 10 },
      ]);
    } else if (toggleMenu === 'news') {
      setTopSitesByTags([
        { name: 'CNN', visits: 25 },
        { name: 'BBC News', visits: 22 },
        { name: 'Reuters', visits: 18 },
        { name: 'The New York Times', visits: 20 },
        { name: 'Al Jazeera', visits: 115 },
      ]);
    } else if (toggleMenu === 'stocks') {
      setTopSitesByTags([
        { name: 'Yahoo Finance', visits: 18 },
        { name: 'Bloomberg Markets', visits: 16 },
        { name: 'MarketWatch', visits: 20 },
        { name: 'The Motley Fool', visits: 14 },
        { name: 'CNBC Markets', visits: 12 },
      ]);
    } else {
      // For 'web3' or other cases, keep the default data
      setTopSitesByTags([
        { name: 'binance.com', visits: 5 },
        { name: 'mexc.com', visits: 10 },
        { name: 'binance.com', visits: 5 },
        { name: 'mexc.com', visits: 10 },
        { name: 'mexc.com', visits: 10 },
      ]);
    }
  }, [toggleMenu]);
  return (
    <div className='flex flex-col w-full justify-between gap-0'>
      <div className='md:text-3xl text-4xl font-semibold'>
        Top Sites by Tags
      </div>
      {topSitesByTags.length > 0 ? (
        <div className='flex flex-row justify-between w-full '>
          <div className='flex flex-col gap-5 '>
            <div className='md:-mt-5 md:block hidden '>
              {Charts(topSitesByTags as any[], 'visits', h, w, ma)}
            </div>
            <div className='bg-white text-sm w-[128%] overflow-y-auto  h-40'>
              {topSitesByTags &&
                topSitesByTags.map((item: any) => (
                  <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
                    <div>{item.name}</div>
                    <div>{item.visits} Times</div>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex text-xl flex-col w-[10%] max-h-[57%] h-[57%] overflow-y-auto p-0 m-0'>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'web3'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('web3')}>
              Web3
            </div>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'sports'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('sports')}>
              sports
            </div>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'social'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('social')}>
              social
            </div>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'food'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('food')}>
              food
            </div>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'news'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('news')}>
              news
            </div>
            <div
              className={`border  py-2 rounded text-center cursor-pointer text-sm ${
                toggleMenu === 'stocks'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('stocks')}>
              stocks
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex justify-center items-center text-3xl'>
          **Minimum 6 hours of data needed**
        </div>
      )}
    </div>
  );
}
/**
 *      <div className='flex h-10 items-center justify-center text-xl'>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'web3'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('web3')}>
              Web3
            </div>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'sports'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('sports')}>
              Sports
            </div>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'social'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('social')}>
              Social
            </div>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'food'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('food')}>
              Food
            </div>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'news'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('news')}>
              News
            </div>
            <div
              className={`w-full border px-4 py-2   rounded text-center cursor-pointer h-full ${
                toggleMenu === 'stocks'
                  ? 'bg-white text-black  border-blue-900'
                  : 'bg-blue-900 text-white'
              }`}
              onClick={() => setToggleMenu('stocks')}>
              Stocks
            </div>
          </div>
 */
