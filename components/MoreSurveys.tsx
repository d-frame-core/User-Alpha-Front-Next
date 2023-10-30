/** @format */

import React from 'react';

export default function MoreSurveys() {
  return (
    <div className='bg-purple-200 flex flex-col gap-0 w-11/12 mx-auto rounded-lg text-sm md:my-4 my-6 cursor-pointer hover:bg-purple-400'>
      <div className='flex justify-between px-5'>
        <div>Survey Name</div>
        <div>60 DFT</div>
      </div>
      <div className='flex justify-between px-2'>
        <div>By : Amazon</div>
        <div>5 Questions</div>
      </div>
    </div>
  );
}
