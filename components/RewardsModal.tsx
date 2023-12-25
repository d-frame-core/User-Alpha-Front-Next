/** @format */
'use client';
import { Close, History, Money, PaymentRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';

type ModalProps = {
  onClose: () => void;
  id?: string;
  walletAddress?: string;
};

const Modal = ({ onClose, id, walletAddress }: ModalProps) => {
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState<any>(null);
  const [rewardsData, setRewardsData] = useState<any>(null);

  async function fetchHistory() {
    const walletAddress = localStorage.getItem('userPublicAddress');
    const userAccessToken = window.localStorage.getItem('userAccessToken');
    await fetch(`http://localhost:8080/rewards/history/${walletAddress}`, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log('no data');
        } else {
          setHistoryData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchRewards() {
    const walletAddress = localStorage.getItem('userPublicAddress');
    const userAccessToken = window.localStorage.getItem('userAccessToken');
    await fetch(`http://localhost:8080/rewards/pending/${walletAddress}`, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status !== 'PENDING') {
          setRewardsData(data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handlePayoutRequest() {
    const walletAddress = localStorage.getItem('userPublicAddress');
    const userAccessToken = window.localStorage.getItem('userAccessToken');
    const userMongoID =
      typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeUserId');
    await fetch(`http://localhost:8080/rewards/rewardRequests/create`, {
      method: 'POST',
      body: JSON.stringify({
        publicAddress: walletAddress,
        amount: rewardsData.userOneTimeRewards + rewardsData.userDailyRewards,
        status: 'PENDING',
        DframeUserId: userMongoID,
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchHistory();
    fetchRewards();
  }, []);

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg h-72 w-[30rem] flex flex-col justify-between'>
        <h2 className='text-xl font-bold '>Your Rewards</h2>

        <div className='text-black my-4  h-full overflow-y-auto flex justify-center items-center'>
          {showHistory ? (
            <div>
              {historyData && historyData.length > 0 && (
                <div>
                  {historyData.map((entry: any) => {
                    return (
                      <div className='text-center my-2'>
                        Your request for {entry.amount} DFT has been{' '}
                        {entry.status}
                      </div>
                    );
                  })}
                </div>
              )}
              {!historyData && <div>No History Available</div>}
            </div>
          ) : (
            <div>
              {rewardsData && (
                <div className='flex flex-col justify-between items-center gap-4 font-medium'>
                  <div>
                    One time rewards: {rewardsData.userOneTimeRewards} DFT
                  </div>
                  <div>Daily rewards: {rewardsData.userDailyRewards} DFT</div>
                </div>
              )}
              {!rewardsData && (
                <div className='w-11/12 mx-auto text-center font-medium'>
                  You already have reward request pending. It will be completed
                  soon!
                </div>
              )}
            </div>
          )}
        </div>
        <div className='flex justify-between '>
          <button
            onClick={onClose}
            className='px-4 py-2 bg-red-500 text-white flex items-center rounded-md '>
            <Close /> Close
          </button>
          {rewardsData && (
            <button
              className='px-4 py-2 bg-blue-500 text-white flex items-center rounded-md '
              onClick={handlePayoutRequest}>
              <PaymentRounded /> Request Payout
            </button>
          )}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className='px-4 py-2 bg-gray-500 text-white flex items-center rounded-md '>
            {showHistory ? (
              <>
                <Money />
                Rewards
              </>
            ) : (
              <>
                <History /> History
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
