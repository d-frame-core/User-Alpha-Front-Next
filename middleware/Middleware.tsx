/** @format */

'use client';
import { AppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';
/** @format */
declare global {
  interface Window {
    ethereum: any;
    localStorage: Storage;
  }
}

export default function Middleware() {
  const { setUserData } = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    const storedData = window.localStorage.getItem('dframeUserData');
    console.log('stored data', JSON.parse(storedData as any));
    setUserData(JSON.parse(storedData as any));
  }, []);
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

      handleChainChange();
    }
  }, []);

  return null;
}
