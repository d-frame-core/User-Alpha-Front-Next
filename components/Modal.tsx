/** @format */
'use client';
import React, { useState } from 'react';

const BasicModal = (props: { name: string; paragraph: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleOpen}
        className='cursor-pointer w-[97%] md:m-3 my-10 md:my-4 bg-white text-black rounded md:p-2 p-5 hover:bg-black hover:text-white md:text-xl text-3xl '>
        {props.name}
      </div>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center z-50 shadow-lg  '>
          <div className='relative bg-white p-4 rounded-lg shadow-lg max-w-md min-w-[28rem] border border-gray-200'>
            <h2 className='md:text-xl text-2xl font-semibold border-b-2 border-purple-700 pb-2'>
              {props.name}
            </h2>

            <p className='md:text-sm text-2xl border-b-2 border-purple-700 py-4'>
              {props.paragraph}
            </p>
            {props.name === 'Privacy Policy' && (
              <div className='pt-2'>
                <a
                  href='https://dframe.org/privacy-policy/'
                  rel='noreferrer '
                  target='_blank'
                  className='underline text-sm'>
                  D Frame Privacy Policy Link
                </a>
              </div>
            )}
            <button
              onClick={handleClose}
              className='bg-purple-400 hover:bg-purple-600 text-white px-4 py-2 mt-4 rounded-md items-end'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicModal;
