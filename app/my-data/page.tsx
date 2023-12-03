/** @format */
'use client';
import GcpData from '@/components/GcpData';
import IpfsData from '@/components/IpfsData';
import Sidebar from '@/components/Sidebar';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react';

export default function MyData() {
  const [toggleMenu, setToggleMenu] = useState('gcp');
  const [gcpData, setGcpData] = useState([]);
  const [ipfsData, setIpfsData] = useState<any>([]);

  async function fetchDailyRewards() {
    const walletAddress =localStorage.getItem('userPublicAddress');
    const userAccessToken =window.localStorage.getItem('userAccessToken');
    await fetch(
      `http://localhost:8080/user/api/user-data/${walletAddress}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Authorization: `${userAccessToken}`,
        },
      }
    )
    .then((response) => response.json())
    .then((data) =>{
      setGcpData(data.gcp);
      setIpfsData(data.ipfs[0]);
      console.log(data);
    }
    )
    .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchDailyRewards();
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col md:justify-between w-4/5 mx-auto mt-16 md:pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'browser-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('gcp')}>
            Google Cloud
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'email-data'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('ipfs')}>
            IPFS
          </div>
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[40vh] md:mt-0 mt-16'>
          {
            toggleMenu=="gcp"?
            <div>
              {
                gcpData.map((data,index)=>(
                <div key={index}>here is the data</div>
                ))
              }
            </div>:<div>
            {
                ipfsData.map((data:any,index:number)=>(
                <div key={index}>{data?.urlLink}</div>
                ))
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}
