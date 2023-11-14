/** @format */

'use client';
import FAQModal from '@/components/FAQModal';
import BasicModal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { userToken } = React.useContext(AppContext);
  const [learnMoreData, setLearnMoreData] = useState([]);
  async function getLearnMoreData() {
    const userAccessToken =
      userToken ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userAccessToken'));
    await fetch(
      'https://user-backend-402016.el.r.appspot.com/learnmore/api/learnmore/getall',
      {
        method: 'GET',
        cache: 'force-cache',

        headers: { Authorization: `${userAccessToken}` },
      }
    )
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log('FETCHED');
        console.log(data);
        setLearnMoreData(data);
      })
      .catch((error: any) => {
        console.log('error', error);
        alert('error');
      });
  }

  useEffect(() => {
    getLearnMoreData();
  }, []);
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-28 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[70vh]'>
        <div className='w-full'>
          <h1 className='text-3xl font-semibold mb-4'>Learn More</h1>
          <div className='overflow-y-auto h-[90%] max-h-[51rem] md:max-h-full'>
            {learnMoreData &&
              learnMoreData.map((item: any, index) => (
                <BasicModal
                  name={item.title}
                  paragraph={item.text}
                  key={index}
                />
              ))}
            <FAQModal />
          </div>
        </div>
      </div>
    </div>
  );
}
