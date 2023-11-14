/** @format */
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import { AppContext } from '@/context/Context';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface AddTagsModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTagsModal: React.FC<AddTagsModalProps> = ({ open, onClose }) => {
  const {
    userData,
    userWalletAddress,
    userToken,
    setUserData,
    setUserToken,
    setUserId,
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  async function addTag() {
    if (!inputValue) {
      toast.error('Enter a valid tag');
      setTimeout(() => {
        toast.remove();
      }, 1000);
      return;
    }
    toast.loading('Adding Tag', { id: '1' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/add-tag/${walletAddress}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          tag: inputValue,
        }),
      }
    )
      .then((response) => {
        toast.success('Added Tag', { id: '1' });
        console.log(response);
        getUserData();
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error Adding DFT', { id: '1' });
      });
    setTimeout(() => {
      setInputValue('');
      onClose();
      toast.remove();
    }, 1000);
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

  useEffect(() => {
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
    handleChainChange();
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

  async function deleteTag(item: String) {
    toast.loading('Deleting Tag', { id: '3' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');

    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/delete-tag/${walletAddress}`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          tag: String(item),
        }),
      }
    )
      .then((response) => {
        toast.success('Deleted Tag', { id: '3' });
        console.log(response);
        getUserData();
      })
      .catch((error) => {
        console.log('Error', error);
        toast.error('Error Deleting DFT', { id: '3' });
      });
    setTimeout(() => {
      setInputValue('');
      onClose();
      toast.remove();
    }, 1000);
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth={true}>
      <DialogTitle>
        <div className='flex justify-between items-center pb-2 border-b-2 border-gray-200'>
          <div className='md:text-xl text-2xl font-semibold'>Tags</div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        {userData && userData.tags.userTags.length > 0 && (
          <div className='mb-4 text-center flex justify-center items-center gap-3 flex-wrap'>
            {userData.tags.userTags.map((item: any, index: any) => (
              <div
                key={index}
                className='relative h-15 pt-2'>
                <div
                  className='px-2 border border-purple-400 rounded'
                  style={{ display: 'inline-block' }}>
                  {item}
                </div>
                <IconButton
                  size='small'
                  onClick={() => deleteTag(item)}
                  className='-top-3 right-2'
                  style={{ backgroundColor: 'red', padding: '2px' }}>
                  <CloseIcon style={{ fontSize: 8, color: 'white' }} />
                </IconButton>
              </div>
            ))}
          </div>
        )}
        {userData &&
          userData.tags &&
          userData.tags.userTags &&
          userData.tags.userTags.length < 5 && (
            <div>
              <div className='w-11/12 mx-auto text-center'>
                <input
                  type='text'
                  placeholder='Enter your tag'
                  value={inputValue}
                  onChange={handleInputChange}
                  className='border-none w-4/5 bg-purple-100 text-black rounded outline-none mx-auto p-1 pl-5 mt-2 shadow-lg'
                />
              </div>
              <div className='flex mt-4 justify-end'>
                <Button
                  content={'Add Tag'}
                  onClick={addTag}
                />
              </div>
            </div>
          )}
      </DialogContent>
      <div className='py-3 border-t-2 border-gray-200 text-center text-gray-500 text-sm'>
        **You can add upto 5 personalised tags**
      </div>
    </Dialog>
  );
};

export default AddTagsModal;
