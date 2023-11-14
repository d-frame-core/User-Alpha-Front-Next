/** @format */
'use client';
import AddTagsModal from '@/components/AddTags';
import Button from '@/components/Button';
import KYCComponent from '@/components/KYCComponent';
import ProfileDetails from '@/components/ProfileDetails';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
  const [addTagsModal, setAddTagsModal] = useState(false);
  const {
    userWalletAddress,
    userData,
    setUserData,
    setUserToken,
    userToken,
    setUserId,
  } = useContext(AppContext);
  const router = useRouter();
  async function getUserData() {
    const walletAddress =
      userWalletAddress ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userPublicAddress'));
    toast.loading('Fetching User Details', { id: '1' });
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
        toast.success('Fetched User Details', { id: '1' });
      })
      .catch((error) => {
        console.log(error);
        toast.error('Error Fetching User Details', { id: '1' });
      });
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  useEffect(() => {
    getUserData();
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

  const fileInputRef = React.useRef(null);

  const handleImageClick = () => {
    (fileInputRef.current as any).click();
  };

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    // You can now handle the selected file (e.g., upload it or set it as a profile image)
    toast.loading('Updating Profile Image', { id: '4' });

    const walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    const formData = new FormData();
    formData.append('profile-image', selectedFile);
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/image/${walletAddress}`,
      {
        method: 'PATCH',

        body: formData,

        headers: { Authorization: `${userAccessToken}` },
      }
    )
      .then((response) => {
        toast.success('Updated Profile Image', { id: '4' });
        console.log(response);
      })
      .catch((error) => {
        toast.error('Error Updating Profile Image', { id: '4' });
        console.log(error);
      });

    setTimeout(() => {
      toast.remove();
      getUserData();
    }, 1000);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 overflow-y-auto border-8 border-[#e3daf6] md:mx-auto mt-24 md:mt-20 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[84vh] h-[80vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl text-5xl font-semibold mb-4'>Profile</h1>
          <div className='flex md:flex-row flex-col justify-evenly w-full'>
            <div>
              <Image
                alt='Image'
                src={
                  userData?.profileImage.length > 1
                    ? userData?.profileImage
                    : '/assets/dframe1.png'
                }
                width={160}
                height={140}
                className='rounded-full border-4 border-purple-500 max-h-[25vh] mx-auto hover:opacity-75 cursor-pointer'
                onClick={handleImageClick}
              />
              <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
            </div>
            {userData && (
              <div className=' md:w-[60%] w-full'>
                <ProfileDetails
                  title='First Name'
                  value={userData?.kyc1.details.firstName}
                  editable={false}
                />
                <ProfileDetails
                  title='Last Name'
                  value={userData?.kyc1.details.lastName}
                  editable={false}
                />
                <ProfileDetails
                  title='Phone Number'
                  value={userData?.kyc1.details.phoneNumber}
                  editable={
                    userData?.kyc1.status === 'UNSUBMITTED' ? false : true
                  }
                />
                <ProfileDetails
                  title='Email'
                  value={userData?.kyc1.details.email}
                  editable={
                    userData?.kyc1.status === 'UNSUBMITTED' ? false : true
                  }
                />
                <ProfileDetails
                  title='Address'
                  value={
                    userData?.kyc2.details.city +
                    ' ' +
                    userData?.kyc2.details.country
                  }
                  editable={false}
                />
                <ProfileDetails
                  title='Wallet Address'
                  value={
                    userData?.publicAddress.slice(0, 10) +
                    '...' +
                    userData?.publicAddress.slice(-10)
                  }
                  editable={false}
                />
              </div>
            )}
          </div>
          <div className='bg-white w-[85%] mx-auto mt-2 rounded-md'>
            {userData &&
              (userData.kyc1.status === 'UNSUBMITTED' ? (
                <KYCComponent
                  title='KYC Verification'
                  description='The verification makes us aware that you are a valid user. It may take up to 24 hours.'
                  button='kyc1'
                />
              ) : userData.kyc2.status === 'UNSUBMITTED' ? (
                <KYCComponent
                  title='KYC Verification'
                  description='You have completed KYC Level-1. Please Complete KYC Level-2 and KYC Level-3'
                  button='kyc2'
                />
              ) : userData.kyc3.status === 'UNSUBMITTED' ? (
                <KYCComponent
                  title='KYC Verification'
                  description='You have completed KYC Level-1 and KYC Level-2. Please Complete KYC Level-3'
                  button='kyc3'
                />
              ) : userData.kyc3.status === 'UNVERIFIED' &&
                userData.kyc2.status === 'UNVERIFIED' &&
                userData.kyc1.status === 'UNVERIFIED' ? null : null)}
          </div>
          <div className='bg-white w-[85%] mx-auto rounded-md p-3 md:mt-4 mt-6 flex flex-col text-center items-center gap-1'>
            <div className='text-xl font-semibold'>User Tags</div>
            <div className='text-sm'>Which Ads would you like to see?</div>
            <Button
              content={'Add Tags'}
              onClick={() => setAddTagsModal(true)}
            />
          </div>
        </div>
        <AddTagsModal
          open={addTagsModal}
          onClose={() => setAddTagsModal(false)}
        />
      </div>
    </div>
  );
}
