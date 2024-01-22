/** @format */
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import { AppContext } from '@/context/Context';
const Navbar: React.FC = () => {
  const { userData } = useContext(AppContext);
  const router = useRouter();
  const handleLogout = async () => {
    window.localStorage.removeItem('dframeUserId');
    window.localStorage.removeItem('userAccessToken');
    window.localStorage.removeItem('dframeUserData');
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ eth_accounts: {} }],
      });
      router.push('/');
    } catch (error) {
      console.error(error);
      toast.error('Error disconnecting from MetaMask');
    }
  };

  return (
    <div className='absolute top-0 md:z-10 md:left-[18%] left-0  -z-10 h-12 md:h-16 bg-gradient-to-r from-[rgba(92,15,255,.66)] to-white text-black md:w-[82%] w-full flex items-center p-2 justify-between'>
      {/* Left Side of Navbar */}
      <div className='flex items-center'></div>

      {/* Right Side of Navbar */}
      <div className='flex items-center justify-center'>
        <Image
          alt='iamge'
          src={
            userData?.profileImage.length > 1
              ? userData.profileImage
              : '/assets/dframe1.png'
          }
          width={50}
          height={30}
          className='rounded-full border-2 border-purple-500 mx-auto'
        />
        <div className='mx-3 text-black cursor-pointer'>
          <p>{userData ? userData.kyc1.details.userName : 'userName'}</p>
        </div>

        <div
          className='text-2xl cursor-pointer'
          onClick={handleLogout} // Call the handleLogout function on click
        >
          <LogoutIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
