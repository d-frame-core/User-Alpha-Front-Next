/** @format */
'use client';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import PhoneNumberModal from './PhoneNumberModal';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { AppContext } from '@/context/Context';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface ButtonProps {
  title: string;
  value: string;
  editable: boolean;
}

const ProfileDetails: React.FC<ButtonProps> = ({ title, value, editable }) => {
  const [phoneNumberModal, setPhoneNumberModal] = useState(false);
  const { userData, userWalletAddress, userToken } =
    React.useContext(AppContext);
  const router = useRouter();
  function handleModalOpener() {
    if (title === 'Phone Number') {
      setPhoneNumberModal(true);
    } else if (title === 'Email') {
      setPhoneNumberModal(false);
      signInWithGoogle();
    }
  }

  const firebaseConfig = {
    apiKey: 'AIzaSyAsX11BlepBimnAmN_RifD2-At63PMQzkk',
    authDomain: 'user-frontend-alpha.firebaseapp.com',
    projectId: 'user-frontend-alpha',
    storageBucket: 'user-frontend-alpha.appspot.com',
    messagingSenderId: '540206401389',
    appId: '1:540206401389:web:9bdbd066888129df8abc64',
    measurementId: 'G-7K4D0JSC06',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result: any) => {
        const user = result.user;

        const walletAddress =
          userWalletAddress || localStorage.getItem('userPublicAddress');
        const userAccessToken =
          userToken || window.localStorage.getItem('userAccessToken');
        toast.loading('Updating Email Id', { id: '10' });
        await fetch(`http://localhost:8080/user/api/kyc1/${walletAddress}`, {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            Authorization: `${userAccessToken}`,
          },
          body: JSON.stringify({
            firstName: userData.kyc1.details.firstName,
            lastName: userData.kyc1.details.lastName,
            userName: userData.kyc1.details.userName,
            phoneNumber: userData.kyc1.details.phoneNumber,
            email: user.email,
          }),
        })
          .then((response) => {
            toast.success('Updated Email Id', { id: '10' });
          })
          .catch((err) => {
            toast.error('Error Updating Email Id', { id: '10' });
            console.log(err);
          });
      })
      .catch((error: any) => {
        toast.error('Error Updating Email Id', { id: '10' });
        console.log(error);
      });

    setTimeout(() => {
      toast.remove();
      router.push('/profile');
    }, 1000);
  };
  return (
    <div className='flex md:text-lg md:text-left text-2xl md:my-3 my-9'>
      <div className='md:w-[30%] w-[36%]'>{title}</div>
      <div className='md:w-[5%] w-[2%]'>:</div>
      <div className='w-[50%] flex items-center'>
        {value}
        {editable && (
          <div onClick={handleModalOpener}>
            <EditIcon className='cursor-pointer' />
          </div>
        )}
      </div>
      <PhoneNumberModal
        open={phoneNumberModal}
        onClose={() => setPhoneNumberModal(false)}
      />
    </div>
  );
};

export default ProfileDetails;
