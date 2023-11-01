/** @format */
'use client';
import Button from '@/components/Button';
import KYC3Details from '@/components/KYC3Details';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import { Step, StepLabel, Stepper } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';

export default function KYC1() {
  const { userWalletAddress, userData } = useContext(AppContext);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const [governmentProof1, setGovernmentProof1] = useState<any>(null);
  const [governmentProof2, setGovernmentProof2] = useState<any>(null);

  const uploadPhoto = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Handle photo upload logic here
      console.log('Uploading photo:', file);
      setUserPhoto(file);
    }
  };

  const uploadGovernmentProof1 = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Handle photo upload logic here
      console.log('Uploading photo:', file);
      setGovernmentProof1(file);
    }
  };
  const uploadGovernmentProof2 = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Handle photo upload logic here
      console.log('Uploading photo:', file);
      setGovernmentProof2(file);
    }
  };

  const router = useRouter();
  async function submitKYC3() {
    if (!governmentProof1 || !governmentProof2 || !userPhoto) {
      toast.error('Select All files', { id: '1' });
      return;
    }
    toast.loading('Updating KYC Level-3 Details', { id: '1' });

    const walletAddress =
      userWalletAddress || window.localStorage.getItem('userPublicAddress');
    const formData = new FormData();
    formData.append('idProof', governmentProof1);
    formData.append('addressProof', governmentProof2);
    formData.append('userPhoto', userPhoto);
    await fetch(`http://localhost:8080/user/api/kyc3/${walletAddress}`, {
      method: 'PATCH',
      body: formData,
    })
      .then((response) => {
        toast.success('Updated KYC Level-3 Details', { id: '1' });
        console.log(response);
      })
      .catch((error) => {
        toast.error('Error Updating KYC Level-3 Details', { id: '1' });
        console.log(error);
      });

    setTimeout(() => {
      toast.remove();
      router.push('/profile');
    }, 1000);
  }

  const data = ['Level-1', 'Level-2', 'Level-3'];

  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto md:mt-24 mt-48 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[82vh] h-[55vh]'>
        {userData?.kyc3.status !== 'unsubmitted' ? (
          <div className='w-full'>
            <h1 className='md:text-3xl font-semibold mb-4 text-5xl'>
              KYC Level-3
            </h1>
            <div className='flex flex-col w-[75%] mx-auto justify-start'>
              <KYC3Details
                title='Photo'
                description='Upload image with clear background'
                onChange={(e) => uploadPhoto(e)}
                selectedFile={userPhoto}
              />
              <KYC3Details
                title='ID Proof'
                description='Aadhar Card, Driving License, PAN Card etc.'
                onChange={(e) => uploadGovernmentProof1(e)}
                selectedFile={governmentProof1}
              />
              <KYC3Details
                title='Address Proof'
                description='Electricity Bill, Phone Bill, Voter ID, etc.'
                onChange={(e) => uploadGovernmentProof2(e)}
                selectedFile={governmentProof2}
              />
            </div>
            <div className='w-11/12 mx-auto md:my-4 my-10'>
              <Stepper
                activeStep={2}
                alternativeLabel>
                {data.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </div>
            <div className='text-center mt-8'>
              <Button
                content={'Submit'}
                onClick={submitKYC3}
              />
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <h1 className='md:text-3xl font-semibold mb-4 text-5xl'>
              KYC Level-3
            </h1>
            <div
              className='flex flex-col gap-4 md:h-[70vh] h-[40vh] justify-center items-center italic text-3xl font-semibold
                   '>
              <Image
                src={'/assets/success.svg'}
                width={200}
                height={200}
                alt='success'
                className='animate-bounce'
              />
              **Your details are submitted**
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
