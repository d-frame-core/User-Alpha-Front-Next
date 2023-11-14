/** @format */
'use client';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from 'react-hot-toast';
import { dframeABI, dframeAddress } from '@/utils/Utils';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import DoneIcon from '@mui/icons-material/Done';
import SaleHistory from '@/components/SaleHistory';
export default function SellDFT() {
  const {
    userWalletAddress,
    userToken,
    userData,
    setUserData,
    setUserId,
    userId,
    setUserToken,
  } = useContext(AppContext);
  const [pastTransactions, setPastTransactions] = useState<any[] | never[]>([]);
  const [sendDFTAmount, setSendDFTAmount] = useState<any>('');
  const router = useRouter();
  const [eligible, setEligible] = useState(false);

  const [edit, setEdit] = useState(false);

  const walletAddress =
    userWalletAddress ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('userPublicAddress'));

  const userMongoID =
    userId ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('dframeUserId'));

  const [walletBalance, setWalletBalance] = useState<String>('');

  useEffect(() => {
    getBalance();
  }, []);

  function copyWalletAddress() {
    const _walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');
    navigator.clipboard.writeText(_walletAddress);
    toast.success('Copied Wallet Address');
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }
  async function sendDFTFunction() {
    if (!/^\d+$/.test(sendDFTAmount)) {
      toast.error('Please enter a valid numeric amount');
      return;
    }
    if (sendDFTAmount < 1000 || sendDFTAmount > 10000) {
      toast.error('Limit 1,000-10,000');
      return;
    }
    toast.loading('Listing DFT', { id: '1' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/dex/api/dft-sale/${walletAddress}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          amount: Number(sendDFTAmount),
        }),
      }
    )
      .then((response) => {
        toast.success('Listed DFT', { id: '1' });
        console.log(response);
        getUserData();
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error Listing DFT', { id: '1' });
      });
    setTimeout(() => {
      getUserData();
      toast.remove();
    }, 1000);
  }
  async function deleteDFTListing() {
    toast.loading('Deleting Listing', { id: '2' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/dex/api/dft-sale/${walletAddress}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          amount: Number(sendDFTAmount),
        }),
      }
    )
      .then((response) => {
        toast.success('Deleted Listing', { id: '2' });
        console.log(response);
        getUserData();
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error Deleting Listing', { id: '2' });
      });
    setTimeout(() => {
      toast.remove();
      getUserData();
    }, 1000);
  }

  async function editDFTListing() {
    if (!/^\d+$/.test(sendDFTAmount)) {
      toast.error('Please enter a valid numeric amount');
      return;
    }
    if (sendDFTAmount < 1000 || sendDFTAmount > 10000) {
      toast.error('Limit 1,000-10,000');
      return;
    }
    toast.loading('Editing Listing', { id: '3' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/dex/api/dft-sale/${walletAddress}`,
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          amount: Number(sendDFTAmount),
        }),
      }
    )
      .then((response) => {
        toast.success('Edited Listing', { id: '3' });
        console.log(response);
        getUserData();
        setEdit(false);
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error Deleting Listing', { id: '3' });
      });
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }
  async function getBalance() {
    const web3 = new Web3(window.ethereum);
    const _walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');

    // get the DFT token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    //  get the balance of DFRAME tokens for the specified wallet address
    const balance = await (dframeContract.methods as any)
      .balanceOf(_walletAddress)
      .call();
    const balanceInEth = web3.utils.fromWei(balance, 'ether');

    const balanceInKFormat =
      Math.trunc((balanceInEth as any) / 1000).toString() + 'k';
    setWalletBalance(balanceInKFormat);
    if (BigInt(balance) > BigInt(1000)) {
      setEligible(true);
    } else {
      setEligible(false);
    }
  }

  async function getUserData() {
    const walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');

    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/user/${walletAddress}`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.user);
        setUserToken(data.token);
        setUserId(data.user.id);
        window.localStorage.setItem('dframeUserId', data.user.id);
        window.localStorage.setItem('userAccessToken', data.token);
        window.localStorage.setItem(
          'dframeUserData',
          JSON.stringify(data.user)
        );
        // console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getSaleHistory() {
    toast.loading('Fetching Sale History', { id: '1' });
    const walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');

    await fetch(
      `https://user-backend-402016.el.r.appspot.com/dex/api/pastsale/${walletAddress}`,
      {
        method: 'GET',
        cache: 'force-cache',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // console.log(data.user);
        toast.success('Fetched Sale History', { id: '1' });
        setPastTransactions(data);
      })
      .catch((error) => {
        toast.error('Error Fetching Sale History', { id: '1' });
        console.log(error);
      });
  }

  useEffect(() => {
    getSaleHistory();
    getUserData();
  }, []);

  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-24 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[80vh] h-[93vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl text-5xl font-semibold md:pb-8 pb-16'>
            Sell DFT
          </h1>
          <div className='flex md:flex-row flex-col justify-evenly '>
            <div className='bg-white h-[90%] p-3 rounded-lg md:w-2/5 mx-auto w-11/12 flex justify-center items-center flex-col'>
              <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                Transactions
              </div>
              {pastTransactions.length > 0 ? (
                <div className='border-b-2 border-gray-200 w-full text-lg text-center overflow-y-auto min-h-[47vh] h-[47vh]'>
                  {pastTransactions.map((event: any) => {
                    if (event.from.toString().toLowerCase() === userMongoID) {
                      return (
                        <SaleHistory
                          event={event}
                          sent={true}
                        />
                      );
                    } else {
                      return (
                        <SaleHistory
                          event={event}
                          sent={false}
                        />
                      );
                    }
                  })}
                </div>
              ) : (
                <div className='border-b-2 border-gray-200 w-full text-2xl flex justify-center items-center text-center md:h-80 md:max-h-80 h-96 max-h-96'>
                  **No Past Transactions**
                </div>
              )}
            </div>
            <div className='md:w-2/5 w-11/12 flex flex-col mx-auto mt-12 md:mt-0 md:gap-8 gap-10'>
              <div className='bg-white w-full text-center rounded-lg  flex-col py-4 md:text-lg text-2xl '>
                <div className='mb-4'>
                  {' '}
                  Wallet Balance :{' '}
                  <span className='text-blue-700 font-semibold'>
                    {walletBalance} DFT
                  </span>
                </div>
                {walletAddress && (
                  <div
                    className=''
                    onClick={copyWalletAddress}>
                    {walletAddress.slice(0, 7) +
                      '...' +
                      walletAddress.slice(-7)}

                    <ContentCopyIcon className='ml-2 text-purple-400 text-lg cursor-pointer font-semibold' />
                  </div>
                )}
              </div>
              <div className='bg-white w-full text-center rounded-lg flex-col py-3 md:text-sm text-xl'>
                <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                  List DFT for Sale
                </div>
                {userData && userData?.dftForSale.amount < 1000 ? (
                  <>
                    <div className='md:my-2 my-5 flex flex-col gap-3 text-lg'>
                      Amount to sell :
                      <input
                        className='border-none w-4/5 bg-purple-100 text-sm text-center rounded outline-none mx-auto p-2 pl-5 shadow-lg'
                        placeholder='Amount 1,000-10,000'
                        onChange={(e) => setSendDFTAmount(e.target.value)}
                      />
                    </div>
                    <div className='mt-5'>
                      <button
                        className={` font-bold py-2 px-4 rounded ${
                          eligible
                            ? 'bg-blue-400 hover:bg-blue-700 text-white cursor-pointer'
                            : 'cursor-not-allowed bg-gray-400 text-white'
                        }`}
                        disabled={eligible ? false : true}
                        title={
                          eligible ? '' : 'You need minimum 1000 DFT to sell'
                        }
                        onClick={sendDFTFunction}>
                        {'List for Sale'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='md:my-2 my-4 flex flex-col gap-4 md:text-xl text-3xl'>
                      Your Listing
                      {edit ? (
                        <input
                          className='border-none w-4/5 bg-purple-100 text-sm text-center rounded outline-none mx-auto p-2 pl-3 shadow-lg'
                          placeholder='Amount 1,000-10,000'
                          onChange={(e) => setSendDFTAmount(e.target.value)}
                        />
                      ) : (
                        <div className='md:text-xl text-3xl text-blue-700 font-semibold my-1'>
                          {userData?.dftForSale.amount} DFT
                        </div>
                      )}
                    </div>
                    <div className=' my-3 mx-auto w-3/5 flex justify-around text-3xl'>
                      {edit ? (
                        <div onClick={editDFTListing}>
                          <DoneIcon className='text-blue-900 cursor-pointer font-bold' />
                        </div>
                      ) : (
                        <div onClick={() => setEdit(true)}>
                          <EditIcon className='text-blue-900 cursor-pointer font-bold' />
                        </div>
                      )}
                      <div onClick={deleteDFTListing}>
                        <DeleteIcon className='text-red-500 cursor-pointer font-bold' />
                      </div>
                    </div>
                  </>
                )}
                <div
                  className='mt-4
                '>
                  Minimum 1000 DFT required to sell
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
