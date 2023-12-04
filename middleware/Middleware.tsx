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
  // function to connect to polygon mainnet here.
  const connectToPolygonMainnet = async () => {
    if ((window as any).ethereum) {
      const chainId = await (window as any).ethereum.request({
        method: 'eth_chainId',
      });

      // Check if connected to a different network (not Polygon mainnet)
      if (chainId !== '0x89') {
        // ChainId of Polygon mainnet is '0x89'
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          });
        } catch (error) {
          // Handle error
          console.log('Error while switching to Polygon mainnet:', error);
        }
      }
    } else {
      // Handle case where window.ethereum is not available (e.g., Metamask is not installed)
      console.log('Metamask not available');
    }
  };

  const checkMetamaskConnection = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected, redirect to root route
      router.push('/');
    }
  };

  const handleWalletDisconnect = () => {
    if (!(window as any).ethereum?.selectedAddress) {
      // Metamask wallet disconnected
      router.push('/');
    }
  };

  useEffect(() => {
    // Listen for changes in the selected address property
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', handleWalletDisconnect);
    }
  }, [(window as any).ethereum]);
  useEffect(() => {
    connectToPolygonMainnet();
    checkMetamaskConnection();
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
