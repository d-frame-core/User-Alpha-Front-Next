/** @format */

import React, { useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from './Button';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import toast from 'react-hot-toast';
import { AppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
interface PhoneNumberModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
}

const PhoneNumberModal: React.FC<PhoneNumberModalProps> = ({
  open,
  onClose,
  title,
}) => {
  const { userData, userWalletAddress, userToken } = useContext(AppContext);
  const router = useRouter();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: 'user-frontend-alpha.firebaseapp.com',
    projectId: 'user-frontend-alpha',
    storageBucket: 'user-frontend-alpha.appspot.com',
    messagingSenderId: '540206401389',
    appId: '1:540206401389:web:9bdbd066888129df8abc64',
    measurementId: 'G-7K4D0JSC06',
  };

  // Initialize Firebase
  // console.log(process.env.FIREBASE_API);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';

  const handleSendOTP = async () => {
    toast.loading('Sending OTP', { id: '1' });
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );

    let appVerifier = (window as any).recaptchaVerifier;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      toast.success('Sent OTP', { id: '1' });
    } catch (error) {
      toast.error('Error Sending OTP', { id: '1' });
      console.log(error);
      return null;
    }
  };

  const handleVerifyAndUpdate = () => {
    toast.loading('Verifying OTP', { id: '2' });
    (confirmationResult as any)
      .confirm(otp)
      .then(async (user: any) => {
        // Update user profile or do whatever you need
        const walletAddress =
          userWalletAddress || localStorage.getItem('userPublicAddress');
        const userAccessToken =
          userToken || window.localStorage.getItem('userAccessToken');

        toast.loading('Updating Phone Number', { id: '2' });
        await fetch(
          `https://user-backend-402016.el.r.appspot.com/user/api/kyc1/${walletAddress}`,
          {
            method: 'PATCH',
            headers: {
              'Content-type': 'application/json',
              Authorization: `${userAccessToken}`,
            },
            body: JSON.stringify({
              firstName: userData.kyc1.details.firstName,
              lastName: userData.kyc1.details.lastName,
              userName: userData.kyc1.details.userName,
              phoneNumber: phoneNumber,
              email: userData.kyc1.details.email,
            }),
          }
        )
          .then((response) => {
            toast.success('Updated Phone Number', { id: '2' });
          })
          .catch((error) => {
            console.log(error);
            toast.error('Error Updating Phone Number', { id: '2' });
          });
      })
      .catch((error: any) => {
        toast.error('Error Verifying OTP', { id: '2' });
        console.log(error);
      });
    setTimeout(() => {
      toast.remove();
      setOtp('');
      setConfirmationResult('');
      setPhoneNumber('');
      onClose();
      router.push('/profile');
    }, 1000);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'>
      <DialogTitle>
        <div className='flex justify-between items-center pb-2 border-b-2 border-gray-200'>
          <div className='md:text-xl text-2xl font-semibold'>
            {title} Phone Number
          </div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='flex items-center'>
          <div className='text-lg w-[33%]'>Enter Number</div>
          <div className=' w-[3%]'>:</div>
          <input
            type='text'
            placeholder='Enter WITH Country Code'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className='border rounded-lg py-1 px-3 w-[64%]'
          />
        </div>
        <div className='flex mt-2 mb-8 justify-end'>
          <Button
            content={'Send OTP'}
            onClick={handleSendOTP}
          />
        </div>
        <div id='recaptcha-container'></div>
        <div className='flex items-center'>
          <div className='text-lg w-[33%]'>Enter OTP</div>
          <div className=' w-[3%]'>:</div>
          <input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className='border rounded-lg py-1 px-3 w-[64%]'
          />
        </div>
        <div className='flex mt-2 justify-end'>
          <Button
            content={'Verify and Update'}
            onClick={handleVerifyAndUpdate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneNumberModal;
