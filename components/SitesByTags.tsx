/** @format */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import Charts from './Charts';
import { AppContext } from '@/context/Context';
import { useMediaQuery } from '@mui/material';

export default function SitesByTags() {
  const ma = useMediaQuery('(min-width:880px)');
  var h: number = 240;
  var w: number = 650;
  const [topSitesByTags, setTopSitesByTags] = useState([
    { name: 'binancedsfasdf.com', visits: 5 },
    { name: 'mexc.com', visits: 10 },
    { name: 'bybit.com', visits: 5 },
    { name: 'wazirx.com', visits: 10 },
    { name: 'coindcx.com', visits: 10 },
  ]);
  const { userWalletAddress } = useContext(AppContext);
  const walletAddress =
    userWalletAddress ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('userPublicAddress'));

  const [toggleMenu, setToggleMenu] = useState('web3');

  useEffect(() => {
    if (toggleMenu === 'sports') {
      setTopSitesByTags([
        { name: 'https://www.espn.com', visits: 8 },
        { name: 'https://www.nfl.com', visits: 5 },
        { name: 'https://www.nba.com', visits: 12 },
        { name: 'https://www.fifa.com', visits: 7 },
        { name: 'https://www.olympics.com', visits: 10 },
      ]);
    } else if (toggleMenu === 'social') {
      setTopSitesByTags([
        { name: 'https://www.facebook.com', visits: 20 },
        { name: 'https://www.twitter.com', visits: 18 },
        { name: 'https://www.instagram.com', visits: 15 },
        { name: 'https://www.linkedin.com', visits: 12 },
        { name: 'https://www.reddit.com', visits: 10 },
      ]);
    } else if (toggleMenu === 'food') {
      setTopSitesByTags([
        { name: 'https://www.foodnetwork.com', visits: 7 },
        { name: 'https://www.allrecipes.com', visits: 10 },
        { name: 'https://www.epicurious.com', visits: 5 },
        { name: 'https://www.tasty.co', visits: 8 },
        { name: 'https://www.seriouseats.com', visits: 6 },
      ]);
    } else if (toggleMenu === 'crypto') {
      setTopSitesByTags([
        { name: 'https://www.coinbase.com', visits: 15 },
        { name: 'https://www.kraken.com', visits: 12 },
        { name: 'https://www.binance.com', visits: 20 },
        { name: 'https://www.bitfinex.com', visits: 8 },
        { name: 'https://www.gemini.com', visits: 10 },
      ]);
    } else if (toggleMenu === 'news') {
      setTopSitesByTags([
        { name: 'https://www.cnn.com', visits: 25 },
        { name: 'https://www.bbc.com/news', visits: 22 },
        { name: 'https://www.reuters.com', visits: 18 },
        { name: 'https://www.nytimes.com', visits: 20 },
        { name: 'https://www.aljazeera.com', visits: 115 },
      ]);
    } else if (toggleMenu === 'stocks') {
      setTopSitesByTags([
        { name: 'https://www.yahoo.com/finance', visits: 18 },
        { name: 'https://www.bloomberg.com/markets', visits: 16 },
        { name: 'https://www.marketwatch.com', visits: 20 },
        { name: 'https://www.fool.com', visits: 14 },
        { name: 'https://www.cnbc.com/markets', visits: 12 },
      ]);
    } else {
      // For 'web3' or other cases, keep the default data
      setTopSitesByTags([
        { name: 'https://www.binance.com', visits: 5 },
        { name: 'https://www.mexc.com', visits: 10 },
        { name: 'https://www.binance.com', visits: 5 },
        { name: 'https://www.mexc.com', visits: 10 },
        { name: 'https://www.mexc.com', visits: 10 },
      ]);
    }
  }, [toggleMenu]);

  return (
    <div className='flex flex-col justify-between w-full gap-4'>
      <div className='md:text-3xl text-4xl font-semibold'>
        Top Sites By Tags
      </div>
      {topSitesByTags.length > 0 ? (
        <>
          <div className='md:-mt-5 ml-[10%] md:block hidden'>
            {Charts(topSitesByTags as any[], 'visits', h, w, ma)}
          </div>
          <div className='bg-white text-sm w-full overflow-y-auto'>
            {topSitesByTags &&
              topSitesByTags.map((item: any) => (
                <div className='md:py-3 py-5 border-b-2 border-gray-200 flex items-center justify-between md:px-20 px-2 md:text-sm text-xl'>
                  <div>{item.name}</div>
                  <div>{item.visits} Times</div>
                </div>
              ))}
          </div>
          <div className='absolute md:top-48 top-52 md:right-14 right-5'>
            <div
              className={`border py-2 px-2 rounded text-center cursor-pointer text-sm ${
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
        </>
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

/**
           * <div className='flex text-xl flex-col w-[10%] max-h-[57%] h-[57%] overflow-y-auto p-0 m-0'>
            <div
              className={`border py-2 rounded text-center cursor-pointer text-sm ${
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
           */
