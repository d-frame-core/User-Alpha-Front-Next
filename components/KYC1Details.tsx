/** @format */

import React from 'react';
import PhoneNumberModal from './PhoneNumberModal';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { AppContext } from '@/context/Context';
import toast from 'react-hot-toast';
import Button from './Button';
interface KYC1DetailsProps {
  title: string;
  onChange: (e: any) => void;
  placeHolder: string;
}

const KYC1Details: React.FC<KYC1DetailsProps> = ({
  title,
  onChange,
  placeHolder,
}) => {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: 'user-frontend-alpha.firebaseapp.com',
    projectId: 'user-frontend-alpha',
    storageBucket: 'user-frontend-alpha.appspot.com',
    messagingSenderId: '540206401389',
    appId: '1:540206401389:web:9bdbd066888129df8abc64',
    measurementId: 'G-7K4D0JSC06',
  };

  const [emailSignIn, setEmailSignIn] = React.useState(false);
  const [emailEntered, setEmailEntered] = React.useState('');
  const [phoneNumberModal, setPhoneNumberModal] = React.useState(false);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result: any) => {
      const email = result.user.email;
      console.log('EMAIL IS', email);
      setEmailEntered(email);
      onChange(email);
      setEmailSignIn(true);
    });
  };
  return (
    <div className='flex md:text-lg text-xl text-left md:my-3 my-6 items-center'>
      <div className='md:w-[25%] w-[50%]'>{title}</div>
      <div className='w-[5%]'>:</div>
      {title !== 'Email' && (
        <div className='w-[50%] flex items-center justify-center'>
          <input
            className='rounded-lg w-full px-4 py-1 border-none outline-none'
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeHolder}
          />
        </div>
      )}
      {title === 'Email' && (
        <div className='w-[50%] flex items-center justify-start'>
          {emailSignIn ? (
            <div>{emailEntered}</div>
          ) : (
            <Button
              content={'Sign In'}
              onClick={signInWithGoogle}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default KYC1Details;
