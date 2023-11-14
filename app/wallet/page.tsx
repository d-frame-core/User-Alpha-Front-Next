/** @format */
'use client';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import toast from 'react-hot-toast';
import { dframeABI, dframeAddress } from '@/utils/Utils';
import TransactionDetails from '@/components/TransactionDetails';
import Button from '@/components/Button';

export default function Wallet() {
  const { userWalletAddress } = useContext(AppContext);
  const walletAddress =
    userWalletAddress ||
    (typeof window !== 'undefined' &&
      window.localStorage.getItem('userPublicAddress'));
  const [pastTransactions, setPastTransactions] = useState<any[] | never[]>([]);
  const [sendWalletAddress, setSendWalletAddress] = useState<any>('');
  const [sendDFTAmount, setSendDFTAmount] = useState<any>('');

  const [walletBalance, setWalletBalance] = useState<String>('');

  async function getPastTransactions() {
    toast.loading('Fetching Past Transactions', { id: '5' });
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/wallet/past-transactions/${walletAddress}`,
      {
        method: 'GET',
        cache: 'force-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setPastTransactions(data.pastTransactions);
        toast.success('Fetched Past Transactions', { id: '5' });
      })
      .catch((error) => {
        console.log(error);
        toast.loading('Fetching Past Transactions', { id: '5' });
      });
  }

  useEffect(() => {
    getPastTransactions();
    getBalance();
  }, []);

  function copyWalletAddress() {
    navigator.clipboard.writeText(walletAddress);
    toast.success('Copied Wallet Address');
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  async function sendDFTFunction() {
    if (sendDFTAmount === '' || sendWalletAddress === '') {
      toast.error('Please enter the required fields');
      return;
    }
    toast.loading('Sending Transaction', { id: '1' });
    const web3 = new Web3((window as any).ethereum);

    // set the wallet address to query
    const _walletAddress =
      userWalletAddress ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userPublicAddress'));
    // set the contract address of the DFRAME token

    // get the DFRAME token contract instance
    const dframeContract = new web3.eth.Contract(
      dframeABI as any,
      dframeAddress
    );
    const amount = web3.utils.toWei(sendDFTAmount.toString(), 'ether');

    const tx = (dframeContract.methods as any)
      .transfer(sendWalletAddress, amount)
      .send({
        from: _walletAddress,
      })
      .on('transactionHash', function (hash: any) {
        console.log('Transaction Hash:', hash);
      })
      .on('receipt', function (receipt: any) {
        console.log('Transaction Receipt:', receipt);
      })
      .on('confirmation', function (confirmationNumber: any, receipt: any) {
        console.log('Confirmation Number:', confirmationNumber);
        console.log('Transaction Receipt:', receipt);
      })
      .on('error', function (error: any) {
        console.log('Error:', error);
        alert('Error: ' + error.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });

    // wait for the tx on metamask to be completed then recall the getBalance function to update the balance and getpastevents function
    await tx;
    toast.success('Sent Transaction', { id: '1' });
    setTimeout(() => {
      toast.remove();
      setSendWalletAddress('');
      setSendDFTAmount('');
      getPastTransactions();
    }, 1000);
  }

  async function getBalance() {
    const web3 = new Web3(window.ethereum);
    const _walletAddress =
      userWalletAddress ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userPublicAddress'));

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
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-24 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 h-[82vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl text-5xl font-semibold md:pb-8 pb-12'>
            Wallet
          </h1>
          <div className='flex md:flex-row flex-col justify-evenly '>
            <div className='bg-white p-3 rounded-lg md:w-2/5 mx-auto w-11/12 flex justify-start items-center flex-col h-[30rem]'>
              <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                Transactions
              </div>
              {pastTransactions && pastTransactions.length > 0 ? (
                <div className='border-b-13 border-gray-200 w-full text-lg text-center overflow-y-auto '>
                  {pastTransactions.map((event: any) => {
                    if (
                      event.returnValues.from.toString().toLowerCase() ===
                      walletAddress.toString().toLowerCase()
                    ) {
                      return (
                        <TransactionDetails
                          event={event}
                          sent={true}
                        />
                      );
                    } else {
                      return (
                        <TransactionDetails
                          event={event}
                          sent={false}
                        />
                      );
                    }
                  })}
                </div>
              ) : (
                <div className='border-b-2 border-gray-200 w-full text-xl flex justify-center items-center text-center h-80 max-h-80'>
                  **No Past Transactions**
                </div>
              )}
            </div>
            <div className='md:w-2/5 w-11/12 flex flex-col mx-auto mt-12 md:mt-0 gap-[4rem]'>
              <div className='bg-white w-full text-center rounded-lg  flex-col py-4 md:text-lg text-2xl '>
                <div className='mb-4'>
                  {' '}
                  Wallet Balance :{' '}
                  <span className='text-blue-700 font-semibold'>
                    {walletBalance} DFT
                  </span>
                </div>
                {walletAddress && (
                  <div className=''>
                    {walletAddress.slice(0, 7) +
                      '...' +
                      walletAddress.slice(-7)}

                    <ContentCopyIcon
                      className='ml-2 text-purple-400 text-lg cursor-pointer font-semibold'
                      onClick={copyWalletAddress}
                    />
                  </div>
                )}
              </div>
              <div className='bg-white w-full text-center rounded-lg flex-col py-3 text-xl'>
                <div className='md:text-xl text-3xl pb-2 border-b-2 border-gray-300 text-center w-full font-semibold'>
                  Transfer Tokens
                </div>
                <div className='my-5'>
                  Wallet Address :
                  <input
                    className='border-none w-4/5 bg-purple-100 rounded outline-none mx-auto p-1 pl-5 mt-2 shadow-lg'
                    onChange={(e) => setSendWalletAddress(e.target.value)}
                  />
                </div>
                <div className='my-5 '>
                  DFT Amount :
                  <input
                    className='border-none w-4/5 bg-purple-100 rounded outline-none mx-auto p-1 pl-5 mt-2 shadow-lg'
                    onChange={(e) => setSendDFTAmount(e.target.value)}
                  />
                </div>
                <div className='mt-6'>
                  <Button
                    onClick={sendDFTFunction}
                    content={'Send DFT'}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
