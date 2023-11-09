/** @format */
'use client';
import { AppContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';

const FAQModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [faqData, setFaqData] = useState([]);
  const { userToken } = useContext(AppContext);

  async function fetchFAQData() {
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');

    await fetch('http://localhost:8080/faq/api/faq/getall', {
      method: 'GET',
      cache: 'force-cache',
      headers: { Authorization: `${userAccessToken}` },
    })
      .then((response: any) => response.json())
      .then((data: any) => {
        setFaqData(data);
      })
      .catch((error: any) => console.log(error));
  }

  useEffect(() => {
    fetchFAQData();
  }, []);
  return (
    <div>
      <div
        onClick={handleOpen}
        className='cursor-pointer w-[97%] md:m-3 my-10 md:my-4 bg-white text-black rounded md:p-2 p-5 hover:bg-black hover:text-white md:text-xl text-3xl '>
        F.A.Q.
      </div>
      {open && (
        <div className='fixed inset-0 flex items-center justify-center z-50 shadow-lg  '>
          <div className='relative bg-white p-4 rounded-lg shadow-lg max-w-md min-w-[28rem] border border-gray-200'>
            <h2 className='md:text-xl text-2xl font-semibold border-b-2 border-purple-700 pb-2'>
              F.A.Q.
            </h2>
            {/* Displaying FAQ content */}
            <div className='border-purple-700 py-4 m-0 border-b-2 h-80 overflow-y-auto'>
              {faqData.map((item: any, index) => (
                <div
                  key={index}
                  className='py-1'>
                  <h3 className='md:text-sm text-2xl font-semibold pb-1'>
                    {item.question}
                  </h3>
                  <p className='md:text-sm text-2xl'>{item.answer}</p>
                </div>
              ))}
            </div>
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

export default FAQModal;
