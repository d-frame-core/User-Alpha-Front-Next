/** @format */

import React from 'react';
interface RewardDetailProps {
  title: string;
  value: number;
}

const RewardDetail: React.FC<RewardDetailProps> = ({ title, value }) => {
  return (
    <div className='flex w-full border-b-2 justify-between md:px-20 px-4 py-3 border-gray-300'>
      <div>{title} Rewards</div>
      <div>{value} DFT</div>
    </div>
  );
};

export default RewardDetail;
