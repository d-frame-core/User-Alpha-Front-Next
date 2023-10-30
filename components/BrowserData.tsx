/** @format */

'use client';
import React, { useEffect, useState } from 'react';

export default function BrowserData() {
  const [eventData, setEventData] = useState({});

  useEffect(() => {
    console.log('ENTERED USE EFFECT');
    window.addEventListener('message', function (event) {
      console.log('ENTERED EVENT LISTENER');
      if (
        event.source === window &&
        event.data.direction &&
        event.data.direction === 'from-content-script'
      ) {
        // alert("Page script received message: \"" + event.data.message + "\"");
        if (event.data.message != null || undefined) {
          setEventData(event.data.message);
          console.log(event.data.message);
        }
      }
    });
  }, []);
  return (
    <div className='w-full'>
      <h1 className='text-3xl font-semibold mb-4'>Browser Data Collected</h1>
      {eventData && (
        <div className='bg-white h-[85%] overflow-y-auto rounded'>
          {Object.keys(eventData).map((key) => (
            <div
              key={key}
              className='p-4 text-lg border-b border-b-gray-200'>
              You visited {key} website on{' '}
              {new Date((eventData as any)[key].timeStamp).toLocaleString()}.{' '}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
