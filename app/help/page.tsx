/** @format */

// /** @format */

/** @format */
'use client';
import BasicModal from '@/components/Modal';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';

export default function Page() {
  const { userWalletAddress } = useContext(AppContext);

  const [helpData, setHelpData] = useState([]);
  async function getHelpData() {
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');
    await fetch(
      'https://user-backend-402016.el.r.appspot.com/help/api/help/getall',
      {
        method: 'GET',
        cache: 'force-cache',
      }
    )
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
          <h1 className='text-3xl font-semibold mb-4'>Help</h1>
          <div className='overflow-y-auto h-[90%] min-h-full'>
            <div>
              {helpData &&
                helpData.map((item: any, index) => (
                  <BasicModal
                    name={item.title}
                    paragraph={item.text}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
