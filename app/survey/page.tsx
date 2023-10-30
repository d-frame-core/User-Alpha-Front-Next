/** @format */

import MoreSurveys from '@/components/MoreSurveys';
import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function Survey() {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-28 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[70vh]'>
        <div className='w-full'>
          <h1 className='text-3xl font-semibold mb-4'>Survey</h1>
          <div className='flex md:flex-row flex-col items-center gap-10'>
            <div className='bg-white md:h-[57vh] h-[25vh] md:w-1/2 w-full rounded-md md:ml-12'>
              <div className='flex flex-col items-center gap-4 pb-3 pt-2 border-b-2 border-gray-200'>
                <div className='font-semibold text-xl'>
                  Survey title goes here
                </div>
                <div>Survey description upto 40 or 50 words goes here</div>
              </div>
              <div className='flex my-4 justify-around items-center text-sm italic'>
                <div>Total Questions Answered : 4</div>
                <div>Total DFT Earned : 10 DFT</div>
              </div>
              <div className='flex flex-col items-center justify-center mt-14'>
                <div className='text-xl'>What is your favourite fruit ??</div>
                <div className='flex justify-around mt-5 w-11/12 mx-auto'>
                  <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    First button
                  </button>
                  <button className='bg-purple-400 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>
                    Second button
                  </button>
                </div>
              </div>
            </div>
            <div className=' h-[57vh] md:w-[30%] w-[80%] mx-auto flex flex-col gap-10'>
              <div className='bg-white rounded-md text-center py-3 text-sm'>
                <div>Total Survey Answered : 35</div>
                <div>Total DFT earned : 506 DFT</div>
              </div>
              <div className='bg-white md:h-[40vh] h-[20vh] overflow-y-auto rounded-md py-1'>
                <div className='text-center text-xl font-semibold pb-1 border-b-2 border-gray-200'>
                  More Surveys
                </div>
                <MoreSurveys />
                <MoreSurveys />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
