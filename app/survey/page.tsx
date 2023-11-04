/** @format */
'use client';
import Button from '@/components/Button';
import Sidebar from '@/components/Sidebar';
import { AppContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function Survey() {
  const { userWalletAddress, userId, userToken, setToggleTab } =
    useContext(AppContext);
  const [unseenSurveys, setUnseenSurveys] = useState([]);
  const [particularSurveyData, setParticularSurveyData] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [allSurveyData, setAllSurveyData] = useState();
  const selectedOptions = useRef<Array<string[]>>([]);
  const router = useRouter();
  const optionClicked = (option: string) => {
    selectedOptions.current[currentQuestionIndex] =
      selectedOptions.current[currentQuestionIndex] || [];
    selectedOptions.current[currentQuestionIndex].push(option);

    if (
      currentQuestionIndex + 1 <
      (particularSurveyData as any).totalQues.length
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle completion, e.g., show a completion message
      // You can replace the alert with any other suitable action.
      console.log('SELECTED OPTIONS ARE', selectedOptions);
      setTimeout(() => {
        updateSurveyStatus();
      }, 2000);
    }
  };
  async function fetchLatestSurveys() {
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `http://localhost:8080/user/api/get-unseen-surveys/${walletAddress}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${userAccessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          console.log('IDs', data);
          setUnseenSurveys(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateSurveyStatus() {
    toast.loading('Submitting Survey', { id: '2' });
    const userIdD = userId || localStorage.getItem('dframeUserId');

    console.log('SELECTED FINAL', selectedOptions);
    let finalOptions = selectedOptions.current;
    let options = [];
    for (let i = 0; i < finalOptions.length; i++) {
      options.push(finalOptions[i][0]);
    }
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    // console.log(options);
    await fetch(
      `http://localhost:8080/survey/api/update-survey/${
        (particularSurveyData as any)._id
      }`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          options: options,
          userId: userIdD,
          publicAddress: walletAddress,
        }),
      }
    )
      .then((response) => {
        toast.success('Submitted Survey', { id: '2' });
        console.log('SUCCESFULLY UPDATED', response);
      })
      .catch((err) => {
        toast.error('Error Submitting Survey', { id: '2' });
        console.log(err);
      });

    setTimeout(() => {
      toast.remove();
      setToggleTab('profile');
      router.push('/profile');
    }, 1000);
  }

  async function fetchUnseenSurveys() {
    toast.loading('Fetching Unseen Surveys', { id: '1' });
    const walletAddress =
      userWalletAddress || localStorage.getItem('userPublicAddress');
    const userAccessToken =
      userToken || window.localStorage.getItem('userAccessToken');
    await fetch(
      `http://localhost:8080/survey/api/get-surveys/${walletAddress}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `${userAccessToken}`,
        },
        body: JSON.stringify({
          surveyIds: unseenSurveys,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null) {
          setAllSurveyData(data);
          setParticularSurveyData(data[data.length - 1]);
          toast.success('Fetched Unseen Surveys', { id: '1' });
        }
      })
      .catch((error) => {
        console.error(error);
        toast.loading('Error Fetching Unseen Surveys', { id: '1' });
      });
    setTimeout(() => {
      toast.remove();
    }, 1000);
  }

  useEffect(() => {
    fetchLatestSurveys();
  }, []);

  useEffect(() => {
    if (unseenSurveys.length > 0) {
      fetchUnseenSurveys();
    }
  }, [unseenSurveys]);
  return (
    <div className='flex'>
      <Sidebar />
      <div className='mx-5 md:w-3/4 w-11/12 md:mx-auto mt-24 bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[80vh] h-[70vh]'>
        <div className='w-full'>
          <h1 className='md:text-3xl font-semibold pb-4 text-5xl'>Survey</h1>
          <div className='flex md:flex-row flex-col items-center gap-10 mt-5'>
            {particularSurveyData ? (
              <div className='bg-white md:h-[57vh] h-[25vh] md:w-1/2 w-full rounded-md md:ml-12'>
                <div className='flex flex-col items-center gap-4 pb-3 pt-2 border-b-2 border-gray-200'>
                  <div className='font-semibold md:text-xl text-3xl'>
                    {(particularSurveyData as any).surveyName}
                  </div>
                  <div> {(particularSurveyData as any).surveyDescription}</div>
                </div>
                <div className='flex pt-4 justify-around items-center md:text-sm text-xl italic'>
                  <div>
                    Total Questions :{' '}
                    {(particularSurveyData as any).totalQues.length}{' '}
                  </div>
                  <div>
                    Total Reward : {(particularSurveyData as any).totalReward}{' '}
                    DFT
                  </div>
                </div>
                <div className='flex flex-col items-center justify-center mt-10'>
                  <div className='text-xl'>
                    {' '}
                    {
                      (particularSurveyData as any).totalQues[
                        currentQuestionIndex
                      ].title
                    }
                  </div>
                  <div className='flex justify-around md:mt-5 mt-8 w-11/12 mx-auto'>
                    {(particularSurveyData as any).totalQues[
                      currentQuestionIndex
                    ].options.map((option: any, index: any) => (
                      <Button
                        content={option}
                        key={index}
                        onClick={() => optionClicked(option)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className='bg-white md:h-[57vh] h-[25vh] md:w-1/2 w-full rounded-md md:ml-12 flex text-center justify-center items-center text-3xl'>
                **No New Surveys**
              </div>
            )}
            <div className=' h-[57vh] md:w-[30%] w-[80%] mx-auto flex flex-col gap-10'>
              <div className='bg-white rounded-md text-center py-3 text-sm'>
                <div>Total Survey Answered : 35</div>
                <div>Total DFT earned : 506 DFT</div>
              </div>
              {allSurveyData && particularSurveyData ? (
                <div className='bg-white md:h-[40vh] h-[20vh] overflow-y-auto rounded-md py-1'>
                  <div className='text-center text-xl font-semibold pb-1 border-b-2 border-gray-200'>
                    More Surveys
                  </div>
                  {(allSurveyData as any).map((item: any) => (
                    <div
                      className={`bg-purple-200 flex flex-col gap-0 w-11/12 mx-auto rounded-lg text-sm md:my-4 my-6 cursor-pointer hover:bg-purple-400 ${
                        item._id === (particularSurveyData as any)._id
                          ? 'border-2 border-blue-900'
                          : ''
                      }`}
                      onClick={() => setParticularSurveyData(item)}
                      key={item._id}>
                      <div className='text-center text-lg'>
                        <div>{item.surveyName}</div>
                      </div>
                      <div className='flex justify-between px-6 my-1'>
                        <div>{item.totalReward} DFT</div>

                        <div>{item.totalQues.length} Questions</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='bg-white md:h-[40vh] h-[20vh] flex justify-center items-center text-xl rounded-md'>
                  **No New Surveys**
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
