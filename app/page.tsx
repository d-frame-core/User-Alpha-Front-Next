/** @format */
'use client';
import Button from '@/components/Button';
import { AppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Web3 from 'web3';
import { useContext } from 'react';
import Image from 'next/image';
declare global {
  interface Window {
    ethereum?: any; // This is to declare ethereum as an optional property
  }
}

const Home: React.FC = () => {
  const router = useRouter();
  const { userWalletAddress, setUserWalletAddress } = useContext(AppContext);
  const connectToMetamask = async () => {
    toast.loading('Connecting to metamask', { id: '1' });
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        toast.success('Connected to metamask', { id: '1' });
        window.localStorage.setItem('userPublicAddress', accounts[0]);
        setUserWalletAddress(accounts[0]);
        router.push('/profile');
      } catch (error) {
        toast.error('Error Connecting to metamask', { id: '1' });
        console.error(error);
      }
    } else {
      toast.error('Metamask is not installed or not accessible', { id: '1' });
    }
    setTimeout(() => {
      toast.remove();
    }, 1000);
  };

  useEffect(() => {
    if (window.ethereum) {
      const handleChainChange = async () => {
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        if (chainId !== '0x89') {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x89' }],
            });
          } catch (error) {
            console.error('Error switching to Polygon mainnet', error);
          }
        }
      };

      const handleDisconnect = () => {
        // Redirect on disconnect
        router.push('/');
      };

      const handleAccountChange = () => {
        // Redirect on account change
        router.push('/');
      };

      if (window.ethereum) {
        window.ethereum.on('chainChanged', handleChainChange);
        window.ethereum.on('disconnect', handleDisconnect);
        window.ethereum.on('accountsChanged', handleAccountChange);

        return () => {
          window.ethereum.removeListener('chainChanged', handleChainChange);
          window.ethereum.removeListener('disconnect', handleDisconnect);
          window.ethereum.removeListener(
            'accountsChanged',
            handleAccountChange
          );
        };
      }
    }
  }, []);

  return (
    <div className='h-screen flex'>
      <div className='w-3/4 bg-gradient-to-r from-blue-100 to-blue-300 relative flex flex-col'>
        <Image
          width={300}
          height={100}
          src='/assets/dframe1.png' // Use the relative path to the image
          alt='Background'
          className='mt-10 mx-auto object-cover'
        />
        <div className='mt-10 text-center'>
          <h1 className='text-black text-4xl font-bold'>
            Welcome to D Frame User Dashboard
          </h1>
        </div>
      </div>
      <div className='w-1/4 bg-white flex flex-col items-center justify-center rounded-l-full'>
        <Image
          src={'/assets/metamask.svg'}
          width={110}
          height={50}
          alt='Metamask'
          className='pb-6 -mt-8'
        />
        <h1 className='text-xl font-bold mb-5 text-center'>
          Connect Wallet to Login
        </h1>
        <Button
          content='Connect to Metamask'
          onClick={connectToMetamask}
        />
      </div>
    </div>
  );
};

export default Home;
