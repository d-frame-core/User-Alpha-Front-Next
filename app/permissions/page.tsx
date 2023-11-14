/** @format */
'use client';
import Button from '@/components/Button';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from '@mui/material';
import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function page() {
  const { userWalletAddress, userToken, userData } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    browserData: true,
    storageOption: 'GCP',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;

    setFormData({
      ...formData,
      [name]: name === 'storageOption' ? value : checked,
    });
  };

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    toast.loading('Updating permissions', { id: '1' });

    try {
      const walletAddress =
        userWalletAddress || localStorage.getItem('userPublicAddress');

      const userAccessToken =
        userToken || window.localStorage.getItem('userAccessToken');
      await fetch(
        `https://user-backend-402016.el.r.appspot.com/user/api/permissions/${walletAddress}`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            Authorization: `${userAccessToken}`,
          },
          body: JSON.stringify({
            browserData: formData.browserData,
            storageOption: formData.storageOption,
            callDataSharing: true,
            cookies: true,
            emailSharing: true,
            location: true,
            notification: true,
          }),
        }
      ).then((response) => {
        toast.success('Updated permissions', { id: '1' });
        console.log(response);
        setTimeout(() => {
          getPermissions();
        }, 1000);
      });

      // You can display a succesFs message or redirect the user as needed
    } catch (error) {
      console.error('Error updating permissions:', error);
      toast.error('Error Updating permissions', { id: '1' });
      // Display an error message or handle the error as needed
    }
    setTimeout(() => {
      toast.remove();
    }, 1000);
  };

  async function getPermissions() {
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');
    toast.loading('Fetching Permissions', { id: '2' });
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/user/${walletAddress}`,
      {
        method: 'GET',
        cache: 'no-cache',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        toast.success('Fetched Permissions', { id: '2' });
        setFormData(data.user.permissions);
      })
      .catch((error) => {
        toast.error('Error Fetching Permissions', { id: '2' });
        console.log(error);
      });
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  useEffect(() => {
    getPermissions();
  }, []);
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-24 bg-[#e3daf6] rounded flex flex-col p-5 md:h-[80vh] h-[60vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl font-semibold mb-4 text-5xl'>
            Permissions
          </h1>
        </div>
        <div className='flex flex-col md:gap-6 gap-10'>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Browser Data</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControlLabel
                control={
                  <Switch
                    name='browserData'
                    checked={formData.browserData}
                    onChange={handleChange}
                  />
                }
                label=''
              />
            </div>
          </div>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Storage Option</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControl>
                <RadioGroup
                  aria-labelledby='demo-controlled-radio-buttons-group'
                  name='storageOption'
                  value={formData.storageOption}
                  onChange={handleChange}
                  className='flex flex-row'>
                  <div className='flex flex-row'>
                    <FormControlLabel
                      value='GCP'
                      control={<Radio />}
                      label='Google Cloud'
                      className='w-[15vw]'
                    />
                    <FormControlLabel
                      value='IPFS'
                      control={<Radio />}
                      label='Blockchain'
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Email Data</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControlLabel
                disabled
                control={<Switch />}
                label='(In&nbsp;Progress)'
                className='px-2'
              />
            </div>
          </div>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Call Data</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControlLabel
                disabled
                control={<Switch />}
                label='(In&nbsp;Progress)'
                className='px-2'
              />
            </div>
          </div>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Notifications</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControlLabel
                disabled
                control={<Switch />}
                label='(In&nbsp;Progress)'
                className='px-2'
              />
            </div>
          </div>
          <div className='flex items-center md:text-lg text-2xl '>
            <h2 className='md:w-[18%] w-[30%]'>Devices</h2>
            <div className='w-[2%]'>:</div>
            <div className='md:w-[18%] w-[30%]'>
              <FormControlLabel
                disabled
                control={<Switch />}
                label='(In&nbsp;Progress)'
                className='px-2'
              />
            </div>
          </div>
          <div className='flex items-center'>
            <Button
              content='Save Permissions'
              onClick={handlesubmit}></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
