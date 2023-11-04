/** @format */
'use client';
import { AppContext } from '@/context/Context';
import LineChartComponent from './LineChart';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import RewardDetail from './RewardDetails';

export default function MonthlyRewards() {
  const { userWalletAddress, userToken } = useContext(AppContext);

  const [monthlyRewards, setMonthlyRewards] = useState([]);

  const [browserDataReward, setBrowserDataReward] = useState(0);
  const [adReward, setAdReward] = useState(0);
  const [surveyReward, setSurveyReward] = useState(0);
  const [referralReward, setReferralReward] = useState(0);
  async function fetchMonthlyRewards() {
    toast.loading('Fetching Monthly Rewards', { id: '1' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `http://localhost:8080/rewards/api/rewards/monthly/${walletAddress}`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          Authorization: `${userAccessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMonthlyRewards(data);
        const summedValues = data.reduce(
          (accumulator: any, currentValue: any) => {
            accumulator.browserData += currentValue.browserData;
            accumulator.ad += currentValue.ads;
            accumulator.survey += currentValue.survey;
            accumulator.referral += currentValue.referral;
            return accumulator;
          },
          { browserData: 0, ad: 0, survey: 0, referral: 0 }
        );

        // Pass summed values to the components
        setBrowserDataReward(summedValues.browserData);
        setAdReward(summedValues.ad);
        setSurveyReward(summedValues.survey);
        setReferralReward(summedValues.referral);
        toast.success('Fetched Monthly Rewards', { id: '1' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error Fetching Monthly Rewards', { id: '1' });
      });
  }

  useEffect(() => {
    fetchMonthlyRewards();
  }, []);
  console.log(monthlyRewards);
  return (
    <div className='flex flex-col w-full'>
      <div className='md:text-3xl text-5xl font-semibold pb-5'>
        Monthly Rewards
      </div>
      <div className='md:h-3/4 md:block hidden'>
        {monthlyRewards && (
          <LineChartComponent
            data={monthlyRewards}
            type={'month'}
          />
        )}
      </div>
      <div className='bg-white w-full md:text-sm text-2xl overflow-y-auto  mt-10 md:mt-0'>
        <RewardDetail
          title='Browser Data'
          value={browserDataReward}
        />
        <RewardDetail
          title='Ads'
          value={adReward}
        />
        <RewardDetail
          title='Survey'
          value={surveyReward}
        />
        <RewardDetail
          title='Referral'
          value={referralReward}
        />
      </div>
    </div>
  );
}
