/** @format */
'use client';
import Sidebar from '@/components/Sidebar';
import { Step, StepLabel, Stepper } from '@mui/material';
import React, { useContext } from 'react';
import { useState } from 'react';
import Button from '@/components/Button';
import KYC2Details from '@/components/KYC2Details';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast from 'react-hot-toast';
import { countries } from '@/utils/Utils';
import { AppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import KYCSubmitted from '@/components/KYCSubmitted';
import Navbar from '@/components/Navbar';
// import FormControlLabel from '@mui/'
export default function KYC2() {
  const [formData, setFormData] = useState({
    gender: '',
    country: '',
    state: '',
    city: '',
    street: '',
    doorno: '',
    pincode: '',
    dob: '',
    annualIncome: '',
  });

  const router = useRouter();
  const handleInputChange = (field: any, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };
  const [next, setNext] = useState(false);
  const { userWalletAddress, userData, userToken } = useContext(AppContext);

  const incomes = [
    '< $1000',
    '$1000 - $10,000',
    '$10,000 - $20,000',
    '$20,000 - $60,000',
    '$60,000 - $100,000',
    '$100,000 - $200,000',
    '> $200,000',
  ];

  async function submitKYC2() {
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        const formDataKey = key as keyof typeof formData;
        if (formData[formDataKey].length > 200) {
          toast.error(
            `Field "${formDataKey}" should not exceed 200 characters`
          );
          return;
        }
      }
    }

    if (
      !formData.gender ||
      !formData.country ||
      !formData.state ||
      !formData.city ||
      !formData.street ||
      !formData.doorno ||
      !formData.pincode ||
      !formData.dob ||
      !formData.annualIncome
    ) {
      toast.error('Fill All fields');
      return;
    }
    if (!formData) {
      toast.error('Fill All fields');
      return;
    }
    console.log('FORMDATA IS', formData);

    toast.loading('Updating KYC Level-2 Details', { id: '1' });
    const walletAddress =
      userWalletAddress ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userPublicAddress'));
    const userAccessToken =
      userToken ||
      (typeof window !== 'undefined' &&
        window.localStorage.getItem('userAccessToken'));

    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/kyc2/${walletAddress}`,
      {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        toast.success('Updated KYC Level-2 Details', { id: '1' });
        console.log(response);
        router.push('/kyc3');
      })
      .catch((error) => {
        toast.error('Error Updating KYC Level-2 Details', { id: '1' });
        console.log(error);
      });

    setTimeout(() => {
      toast.remove();
    }, 1000);
  }
  const data = ['Level-1', 'Level-2', 'Level-3'];

  function handleNext() {
    setNext(true);
  }

  return (
    <div className='flex'>
      <Sidebar />
      <Navbar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto md:mt-24 mt-48 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[82vh] h-[57vh]'>
        {userData?.kyc2.status === 'UNSUBMITTED' ? (
          <div className='w-full'>
            <h1 className='md:text-3xl font-semibold md:pb-8 pb-16 text-5xl'>
              KYC Level-2
            </h1>
            {!next ? (
              <div className='flex flex-col w-[75%] mx-auto justify-start'>
                <KYC2Details
                  title='House No'
                  values='HouseNo'
                  dropdown={false}
                  setState={(value: string) =>
                    handleInputChange('doorno', value)
                  }
                  state={formData.doorno}
                />
                <KYC2Details
                  title='Street'
                  values='Street'
                  dropdown={false}
                  setState={(value: string) =>
                    handleInputChange('street', value)
                  }
                  state={formData.street}
                />

                <KYC2Details
                  title='City'
                  values='City'
                  dropdown={false}
                  setState={(value: string) => handleInputChange('city', value)}
                  state={formData.city}
                />

                <KYC2Details
                  title='State'
                  values='State'
                  dropdown={false}
                  setState={(value: string) =>
                    handleInputChange('state', value)
                  }
                  state={formData.state}
                />

                <KYC2Details
                  title='Pincode'
                  values='Pincode'
                  dropdown={false}
                  setState={(value: string) =>
                    handleInputChange('pincode', value)
                  }
                  state={formData.pincode}
                />
                <div className='w-11/12 mx-auto md:my-4 my-10'>
                  <Stepper
                    activeStep={1}
                    alternativeLabel>
                    {data.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div className='text-center'>
                  <Button
                    content={'Next'}
                    onClick={handleNext}
                  />
                </div>
              </div>
            ) : (
              <div className='flex flex-col w-[75%] mx-auto justify-start'>
                <KYC2Details
                  title='Gender'
                  values={['male', 'female']}
                  dropdown={true}
                  setState={(value: string) =>
                    handleInputChange('gender', value)
                  }
                  state={formData.gender}
                />

                <KYC2Details
                  title='Annual Income'
                  values={incomes}
                  dropdown={true}
                  setState={(value: string) =>
                    handleInputChange('annualIncome', value)
                  }
                  state={formData.annualIncome}
                />
                <KYC2Details
                  title='Country'
                  values={countries}
                  dropdown={true}
                  setState={(value: string) =>
                    handleInputChange('country', value)
                  }
                  state={formData.country}
                />
                <div className='flex md:text-sm text-xl text-left md:my-1 my-6 items-center'>
                  <div className='md:w-[25%] w-[50%]'>Date of Birth</div>
                  <div className='w-[5%]'>:</div>
                  <div className='md:w-full w-3/5'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer
                        components={['DatePicker']}
                        sx={{
                          background: 'white',
                          borderRadius: '10px',
                        }}>
                        <DatePicker
                          // renderInput={(params) => <TextField {...params} />}
                          label='Select dob'
                          // value={dob}
                          onChange={(newValue: any) => {
                            const { $D, $M, $y } = newValue;
                            let month = '';
                            let d = '';
                            if ($D < 10) {
                              d = `0${$D}`;
                            } else {
                              d = $D;
                            }
                            if ($M + 1 < 10) {
                              month = `0${$M + 1}`;
                            } else {
                              month = $M + 1;
                            }

                            const date = `${d}/${month}/${$y}`;
                            // console.log('date is', date);
                            handleInputChange('dob', date);
                          }}
                          // views={['day', 'month', 'year']}
                          orientation='landscape'
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                </div>
                <div className='w-11/12 mx-auto md:my-6 my-10'>
                  <Stepper
                    activeStep={1}
                    alternativeLabel>
                    {data.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </div>
                <div className='text-center'>
                  <Button
                    content={'Submit'}
                    onClick={submitKYC2}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <KYCSubmitted level={2} />
        )}
      </div>
    </div>
  );
}
