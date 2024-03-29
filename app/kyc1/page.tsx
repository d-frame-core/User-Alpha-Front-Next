/** @format */
'use client';
import Button from '@/components/Button';
import KYC1Details from '@/components/KYC1Details';
import KYCSubmitted from '@/components/KYCSubmitted';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import { Step, StepLabel, Stepper } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export default function KYC1() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const { userWalletAddress, userData, userToken } = useContext(AppContext);
  const router = useRouter();
  async function submitKYC1() {
    if (
      firstName.length > 200 ||
      lastName.length > 200 ||
      userName.length > 200 ||
      phoneNumber.length > 200 ||
      email.length > 200
    ) {
      toast.error('Input fields should not exceed 200 characters');
      return;
    }

    if (!firstName || !lastName || !userName || !phoneNumber || !email) {
      toast.error('Fill All fields');
      return;
    }

    toast.loading('Updating KYC Level-1 Details', { id: '1' });
    const walletAddress =
      userWalletAddress ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userPublicAddress'));
    const userAccessToken =
      userToken ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userAccessToken'));

    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/kyc1/${walletAddress}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          userName,
          phoneNumber,
          email,
        }),
      }
    )
      .then((response) => {
        toast.success('Updated KYC Level-1 Details', { id: '1' });
        console.log(response);
        router.push('/kyc2');
      })
      .catch((error) => {
        toast.error('Error Updating KYC Level-1 Details', { id: '1' });
        console.log(error);
      });

    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  const data = ['Level-1', 'Level-2', 'Level-3'];

  return (
    <div className='flex'>
      <Sidebar />
      <Navbar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto md:mt-24 mt-48 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[82vh] h-[55vh]'>
        {userData?.kyc1.status === 'UNSUBMITTED' ? (
          <div className='w-full'>
            <h1 className='md:text-3xl font-semibold md:pb-8 pb-16 text-5xl'>
              KYC Level-1
            </h1>
            <div className='flex flex-col w-[75%] mx-auto justify-start'>
              <KYC1Details
                title='First Name'
                onChange={(e) => setFirstName(e)}
                placeHolder='Enter your first Name'
              />
              <KYC1Details
                title='Last Name'
                onChange={(e) => setLastName(e)}
                placeHolder='Enter your Last Name'
              />
              <KYC1Details
                title='username'
                onChange={(e) => setUserName(e)}
                placeHolder='Enter a short userName'
              />
              <KYC1Details
                title='Phone Number'
                onChange={(e) => setPhoneNumber(e)}
                placeHolder='Phone No. WITH country code'
              />
              <KYC1Details
                title='Email'
                onChange={(e) => setEmail(e)}
                placeHolder='Enter your active email id'
              />
            </div>
            <div className='w-11/12 mx-auto md:my-2 my-10'>
              <Stepper
                activeStep={0}
                alternativeLabel>
                {data.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className='text-center mt-4'>
              <Button
                content={'Submit'}
                onClick={submitKYC1}
              />
            </div>
          </div>
        ) : (
          <KYCSubmitted level={1} />
        )}
      </div>
    </div>
  );
}
