/** @format */
'use client';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import { Storage, ViewStream } from '@mui/icons-material';
export default function MyData() {
  const [toggleMenu, setToggleMenu] = useState('gcp');
  const [gcpData, setGcpData] = useState<any>([]);
  const [ipfsData, setIpfsData] = useState<any>([]);
  const [duplicateGcpData, setDuplicateGcpData] = useState([]);
  const [duplicateIPFSData, setDuplicateIPFSData] = useState([]);
  const [dropdownValue, setDropdownValue] = useState('100');

  async function fetchStoredData() {
    const walletAddress = localStorage.getItem('userPublicAddress');
    const userAccessToken = window.localStorage.getItem('userAccessToken');
    await fetch(
      `https://user-backend-402016.el.r.appspot.com/user/api/user-data/${walletAddress}`,
      {
        method: 'GET',
        headers: {
          Authorization: `${userAccessToken}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.urlData) {
          setGcpData(data.urlData);
          setDuplicateGcpData(data.urlData);
        }
        if (data.cid) {
          const parsedIPFSData = data.cid.map((entry: any) =>
            JSON.parse(entry)
          );
          setIpfsData(parsedIPFSData);
          setDuplicateIPFSData(parsedIPFSData);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStoredData();
  }, []);

  const handleDropdownChange = (event: any) => {};

  async function handleDropdownChangeIPFS(event: any) {
    console.log('DROPDOWN value', ipfsData);
    setDropdownValue(event.target.value);
    setIpfsData(duplicateIPFSData.slice(0, parseInt(event.target.value)));
  }
  const handleDownloadGcpData = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    const walletAddress = localStorage.getItem('userPublicAddress');
    const pageHeight = doc.internal.pageSize.height;
    const img = new Image();
    img.src = './assets/dframe.png';
    doc.addImage(img, 'PNG', 2, 5, 40, 30);
    // doc.setFontSize(34);
    // doc.setTextColor('blue');
    // doc.text('D Frame - User Data', doc.internal.pageSize.getWidth() / 2, 25, {
    //   align: 'center',
    // });
    yOffset += 30; // Adjust as per your requirement
    doc.setFontSize(20);
    doc.setTextColor('red');
    doc.text(
      `Your Browser Data for ${new Date().toLocaleDateString(
        'en-GB'
      )} \non Google Cloud (Centralised Server)`,
      doc.internal.pageSize.getWidth() / 2,
      yOffset,
      { align: 'center' }
    );
    yOffset += 20; // Adjust as per your requirement
    doc.setTextColor('black');
    doc.setFontSize(16);
    gcpData.forEach((urlEntry: any) => {
      let timeSpent;
      if (urlEntry.timespent.length > 1) {
        const totalTimeSpent = urlEntry.timespent.reduce(
          (a: any, b: any) => a + b,
          0
        );
        const totalTimeSpentInSeconds = totalTimeSpent / 1000;

        if (totalTimeSpentInSeconds < 60) {
          timeSpent = `${totalTimeSpentInSeconds.toFixed(2)} seconds`;
        } else if (
          totalTimeSpentInSeconds >= 60 &&
          totalTimeSpentInSeconds < 3600
        ) {
          const minutes = Math.floor(totalTimeSpentInSeconds / 60);
          timeSpent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
          const hours = Math.floor(totalTimeSpentInSeconds / 3600);
          const remainingMinutes = Math.floor(
            (totalTimeSpentInSeconds % 3600) / 60
          );
          timeSpent = `${hours} hour${
            hours > 1 ? 's' : ''
          } and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
        }
      } else {
        const timespentInSeconds = urlEntry.timespent[0] / 1000;

        if (timespentInSeconds < 60) {
          timeSpent = `${timespentInSeconds.toFixed(2)} seconds`;
        } else if (timespentInSeconds >= 60 && timespentInSeconds < 3600) {
          const minutes = Math.floor(timespentInSeconds / 60);
          timeSpent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
          const hours = Math.floor(timespentInSeconds / 3600);
          const remainingMinutes = Math.floor((timespentInSeconds % 3600) / 60);
          timeSpent = `${hours} hour${
            hours > 1 ? 's' : ''
          } and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
        }
      }

      if (yOffset > pageHeight - 10) {
        doc.addPage();
        doc.addImage(img, 'PNG', 2, 5, 40, 30);
        yOffset = 10;
        yOffset += 30;
      }

      doc.text(
        `You visited ${urlEntry.urlLink} for ${
          urlEntry.timestamps.length < 2
            ? `${urlEntry.timestamps.length} time for `
            : `${urlEntry.timestamps.length} times for `
        } ${timeSpent}`,
        10,
        yOffset
      );

      yOffset += 12;
    });

    doc.save(`gcp_data_${walletAddress}.pdf`);
  };
  const handleDownloadIPFSData = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    const walletAddress = localStorage.getItem('userPublicAddress');
    const pageHeight = doc.internal.pageSize.height;
    const img = new Image();
    img.src = './assets/dframe.png';
    doc.addImage(img, 'PNG', 2, 5, 40, 30);
    // doc.setFontSize(34);
    // doc.setTextColor('blue');
    // doc.text('D Frame - User Data', doc.internal.pageSize.getWidth() / 2, 25, {
    //   align: 'center',
    // });
    yOffset += 30; // Adjust as per your requirement
    doc.setFontSize(20);
    doc.setTextColor('red');
    doc.text(
      `Your Browser Data for ${new Date().toLocaleDateString(
        'en-GB'
      )} \non Blockchain - IPFS (Decentralised Server)`,
      doc.internal.pageSize.getWidth() / 2,
      yOffset,
      { align: 'center' }
    );
    yOffset += 20; // Adjust as per your requirement
    doc.setTextColor('black');
    doc.setFontSize(16);
    duplicateIPFSData.forEach((data: any, index: any) => {
      if (data.length > 0) {
        data.forEach((item: any, index: any) => {
          let timeSpent = '';
          const timespentInSeconds = item.parsedTimeSpent / 1000;

          if (timespentInSeconds < 60) {
            timeSpent = `${timespentInSeconds.toFixed(2)} seconds`;
          } else if (timespentInSeconds >= 60 && timespentInSeconds < 3600) {
            const minutes = Math.floor(timespentInSeconds / 60);
            timeSpent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
          } else {
            const hours = Math.floor(timespentInSeconds / 3600);
            const remainingMinutes = Math.floor(
              (timespentInSeconds % 3600) / 60
            );
            timeSpent = `${hours} hour${
              hours > 1 ? 's' : ''
            } and ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
          }
          if (yOffset > pageHeight - 10) {
            doc.addPage();
            doc.addImage(img, 'PNG', 2, 5, 40, 30);
            yOffset = 10; // Reset yOffset for the new page
            yOffset += 30; // Adjust as per your requirement
          }
          doc.text(
            `You visited ${
              item.urlLink
            } for ${timeSpent} at ${item.localeTimeString.slice(0, 5)} Hours`,
            10,
            yOffset
          );
          yOffset += 12; // Adjust as per your requirement
        });
      }
    });

    doc.save(`ipfs_data_${walletAddress}.pdf`);
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col md:justify-between w-4/5 mx-auto mt-16 md:pb-4 px-auto'>
        <div className='flex h-14 items-center justify-center text-xl'>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'gcp'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('gcp')}>
            Google Cloud
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'ipfs'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('ipfs')}>
            IPFS
          </div>
          <div
            className={`w-[33.4%] border flex items-center justify-center cursor-pointer h-full ${
              toggleMenu === 'download'
                ? 'bg-white text-black  border-blue-900'
                : 'bg-blue-900 text-white'
            }`}
            onClick={() => setToggleMenu('download')}>
            Download Data
          </div>
        </div>
        <div className='mx-5 w-11/12 md:mx-auto bg-[#e3daf6] rounded flex md:flex-row flex-col p-5 md:h-[75vh] h-[40vh] md:mt-0 mt-16 overflow-y-auto'>
          {toggleMenu == 'gcp' ? (
            <div className='w-full'>
              <div className='flex justify-between items-center mb-4 px-10'>
                <h1 className='text-2xl font-semibold'>
                  Your Browser Data on Google Cloud (Centralised Server)
                </h1>
                {/* <select
                  value={dropdownValue}
                  onChange={handleDropdownChange}
                  className='p-2 border border-gray-300 rounded'>
                  <option value='100'>100</option>
                  <option value='50'>50</option>
                  <option value='25'>25</option>
                  <option value='10'>10</option>
                  <option value='5'>5</option>
                </select> */}
              </div>

              {gcpData &&
                gcpData.length > 0 &&
                gcpData.map((urlEntry: any, index: any) => {
                  let timeSpent;
                  if (urlEntry.timespent.length > 1) {
                    const totalTimeSpent = urlEntry.timespent.reduce(
                      (a: number, b: number) => a + b,
                      0
                    );
                    const totalTimeSpentInSeconds = totalTimeSpent / 1000; // Convert from milliseconds to seconds
                    if (totalTimeSpentInSeconds < 60) {
                      timeSpent = `${totalTimeSpentInSeconds.toFixed(
                        2
                      )} seconds`;
                    } else if (
                      totalTimeSpentInSeconds >= 60 &&
                      totalTimeSpentInSeconds < 3600
                    ) {
                      const minutes = Math.floor(totalTimeSpentInSeconds / 60);
                      timeSpent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
                    } else {
                      const hours = Math.floor(totalTimeSpentInSeconds / 3600);
                      const remainingMinutes = Math.floor(
                        (totalTimeSpentInSeconds % 3600) / 60
                      );
                      timeSpent = `${hours} hour${
                        hours > 1 ? 's' : ''
                      } and ${remainingMinutes} minute${
                        remainingMinutes > 1 ? 's' : ''
                      }`;
                    }
                  } else {
                    const timespentInSeconds = urlEntry.timespent[0] / 1000; // Convert from milliseconds to seconds
                    if (timespentInSeconds < 60) {
                      timeSpent = `${timespentInSeconds.toFixed(2)} seconds`;
                    } else if (
                      timespentInSeconds >= 60 &&
                      timespentInSeconds < 3600
                    ) {
                      const minutes = Math.floor(timespentInSeconds / 60);
                      timeSpent = `${minutes} minute${minutes > 1 ? 's' : ''}`;
                    } else {
                      const hours = Math.floor(timespentInSeconds / 3600);
                      const remainingMinutes = Math.floor(
                        (timespentInSeconds % 3600) / 60
                      );
                      timeSpent = `${hours} hour${
                        hours > 1 ? 's' : ''
                      } and ${remainingMinutes} minute${
                        remainingMinutes > 1 ? 's' : ''
                      }`;
                    }
                  }

                  return (
                    <div
                      key={index}
                      className='py-3 text-lg pl-20'>
                      <p>
                        <Link
                          href={urlEntry.urlLink}
                          target='_blank'
                          rel='noReferrer'
                          className=' cursor-pointer'>
                          {urlEntry.urlLink}
                        </Link>{' '}
                        visited{' '}
                        {urlEntry.timestamps.length < 2
                          ? `${urlEntry.timestamps.length} time for `
                          : `${urlEntry.timestamps.length} times for `}
                        {timeSpent}.
                      </p>
                    </div>
                  );
                })}

              {gcpData && gcpData.length < 1 && (
                <div className='flex justify-center items-center h-full w-full font-semibold text-2xl'>
                  NO GCP DATA to display{' '}
                </div>
              )}
            </div>
          ) : toggleMenu == 'ipfs' ? (
            <div className='w-full'>
              <div className='flex justify-between items-center mb-4 px-2'>
                <h1 className='text-2xl font-semibold'>
                  Your Browser Data for {new Date().toLocaleDateString('en-GB')}{' '}
                  on Blockchain - IPFS (Decentralised Server)
                </h1>
                {/* <select
                  value={dropdownValue}
                  onChange={handleDropdownChangeIPFS}
                  className='p-2 border border-gray-300 rounded'>
                  <option value='100'>100</option>
                  <option value='50'>50</option>
                  <option value='25'>25</option>
                  <option value='10'>10</option>
                  <option value='5'>5</option>
                </select> */}
              </div>

              {ipfsData &&
                ipfsData.length > 0 &&
                ipfsData.map((data: any, index: any) => {
                  if (data.length > 0) {
                    console.log(data);
                    return (
                      <div
                        key={index}
                        className=' border-gray-900 py-2 text-xl border-b-2
'>
                        {data.length > 0 &&
                          data.map((item: any, index: any) => {
                            let timeSpent = '';
                            const timespentInSeconds =
                              item.parsedTimeSpent / 1000; // Convert from milliseconds to seconds
                            if (timespentInSeconds < 60) {
                              timeSpent = `${timespentInSeconds.toFixed(
                                2
                              )} seconds`;
                            } else if (
                              timespentInSeconds >= 60 &&
                              timespentInSeconds < 3600
                            ) {
                              const minutes = Math.floor(
                                timespentInSeconds / 60
                              );
                              timeSpent = `${minutes} minute${
                                minutes > 1 ? 's' : ''
                              }`;
                            } else {
                              const hours = Math.floor(
                                timespentInSeconds / 3600
                              );
                              const remainingMinutes = Math.floor(
                                (timespentInSeconds % 3600) / 60
                              );
                              timeSpent = `${hours} hour${
                                hours > 1 ? 's' : ''
                              } and ${remainingMinutes} minute${
                                remainingMinutes > 1 ? 's' : ''
                              }`;
                            }
                            return (
                              <div className='my-4 text-xl'>
                                You visited {item.urlLink} for {timeSpent} at{' '}
                                {item.localeTimeString.slice(0, 5)} Hours
                              </div>
                            );
                          })}
                      </div>
                    );
                  }
                })}
              {ipfsData && ipfsData.length < 1 && (
                <div className='flex justify-center items-center h-full w-full font-semibold text-2xl'>
                  NO IPFS DATA to display{' '}
                </div>
              )}
            </div>
          ) : (
            <div className='w-full'>
              <div className='flex justify-center items-center mb-4 px-10'>
                <h1 className='text-3xl font-semibold'>
                  Download your data in PDF form
                </h1>
              </div>
              <div className='flex flex-col items-center justify-center gap-32 my-32'>
                <button
                  className='bg-black rounded px-4 py-2 text-white'
                  onClick={handleDownloadGcpData}>
                  <ViewStream /> Download Google Cloud Data
                </button>
                <button
                  className='bg-black rounded px-4 py-2 text-white'
                  onClick={handleDownloadIPFSData}>
                  <Storage /> Download Blockchain (IPFS) Data
                </button>
                {/* <button
                  className='bg-black rounded px-4 py-2 text-white'
                  onClick={handleDownloadIPFSData}>
                  <Storage /> Request Older Data
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
