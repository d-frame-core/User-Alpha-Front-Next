/** @format */

'use client';
import FAQModal from '@/components/FAQModal';
import BasicModal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';

export default function Page() {
  const { userToken } = useContext(AppContext);

  const [helpData, setHelpData] = useState([]);
  async function getHelpData() {
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');

    await fetch('http://localhost:8080/help/api/help/getall', {
      method: 'GET',
      cache: 'force-cache',
      headers: { Authorization: `${userAccessToken}` },
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        console.log('FETCHED');
        console.log(data);
        setHelpData(data);
      })
      .catch((error: any) => alert('error'));
  }

  useEffect(() => {
    getHelpData();
  }, []);
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-28 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[70vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl text-5xl font-semibold pb-4'>Help</h1>
          <div className='overflow-y-auto h-[90%] min-h-full'>
            <div>
              {helpData &&
                helpData.map((item: any, index) => (
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
    </div>
  );
}
