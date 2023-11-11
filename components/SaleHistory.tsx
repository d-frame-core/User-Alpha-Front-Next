/** @format */

import React from 'react';
import Web3 from 'web3';
interface SaleHistoryProps {
  event: any;
  sent: boolean;
}

const SaleHistory: React.FC<SaleHistoryProps> = ({ event, sent }) => {
  return (
    <div
      className='bg-purple-100 w-11/12 mx-auto my-4 py-2 px-1 rounded cursor-default'
      key={event._id}>
      <div className='flex justify-between px-2 md:text-sm text-xl'>
        {sent ? (
          <div>
            To: {event.to.slice(0, 5)}
            ....
            {event.to.slice(-5)}
          </div>
        ) : (
          <div>
            From: {event.to.slice(0, 4)}
            ....
            {event.to.slice(-4)}
          </div>
        )}
        <div>
          {' '}
          On:{' '}
          {new Date(event.createdAt).toLocaleDateString('en-GB', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit',
          })}
        </div>
      </div>
      <div className='flex mt-2 justify-between px-3 md:text-xs text-lg'>
        <div className='text-blue-800 font-semibold'>{event.amount} DFT</div>
        <div>
          {' '}
          At:
          {new Date(event.createdAt).toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          })}
        </div>
        {sent ? (
          <div className='text-red-500 font-semibold'>SENT</div>
        ) : (
          <div className='text-green-600 font-semibold'>RECEIVED</div>
        )}
      </div>
    </div>
  );
};

export default SaleHistory;
