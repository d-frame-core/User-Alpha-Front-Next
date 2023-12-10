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
    await fetch(`http://localhost:8080/user/api/user-data/${walletAddress}`, {
      method: 'GET',
      headers: {
        Authorization: `${userAccessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGcpData(data.gcp);
        setDuplicateGcpData(data.gcp);
        setIpfsData(data.ipfs);
        setDuplicateIPFSData(data.ipfs);
        console.log(data.ipfs);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchStoredData();
  }, []);

  const handleDropdownChange = (event: any) => {
    setDropdownValue(event.target.value);
    // Calculate total urlData count across all dates
    const totalCount = duplicateGcpData.reduce(
      (acc: any, entry: any) => acc + entry.urlData.length,
      0
    );
    // Cap urlData across all dates to dropdown value
    let count = 0;
    const updatedGcpData = duplicateGcpData.map((entry: any) => {
      const urlDataCount = Math.ceil(
        (entry.urlData.length / totalCount) * parseInt(event.target.value)
      );
      const updatedUrlData = entry.urlData.slice(0, urlDataCount);
      count += updatedUrlData.length;
      return { ...entry, urlData: updatedUrlData };
    });
    // If the total count is less than the dropdown value, add more data from the original gcpData
    if (count < parseInt(event.target.value)) {
      let remainingCount = parseInt(event.target.value) - count;
      for (let i = 1; i < updatedGcpData.length && remainingCount > 0; i++) {
        const urlDataCount = Math.ceil(
          (gcpData[i].urlData.length / totalCount) * remainingCount
        );
        const updatedUrlData = gcpData[i].urlData.slice(0, urlDataCount);
        updatedGcpData[i].urlData = updatedUrlData;
        remainingCount -= updatedUrlData.length;
        count += updatedUrlData.length;
      }
    }
    setGcpData(updatedGcpData);
  };

  async function handleDropdownChangeIPFS(event: any) {
    setDropdownValue(event.target.value);
    // Calculate total urlData count across all dates
    const totalCount = duplicateIPFSData.reduce(
      (acc: any, entry: any) => acc + entry.urlData.length,
      0
    );
    // Cap urlData across all dates to dropdown value
    let count = 0;
    const updatedIPFSData = duplicateIPFSData.map((entry: any) => {
      const urlDataCount = Math.ceil(
        (entry.urlData.length / totalCount) * parseInt(event.target.value)
      );
      const updatedUrlData = entry.urlData.slice(0, urlDataCount);
      count += updatedUrlData.length;
      return { ...entry, urlData: updatedUrlData };
    });
    // If the total count is less than the dropdown value, add more data from the original gcpData
    if (count < parseInt(event.target.value)) {
      let remainingCount = parseInt(event.target.value) - count;
      for (let i = 1; i < updatedIPFSData.length && remainingCount > 0; i++) {
        const urlDataCount = Math.ceil(
          (gcpData[i].urlData.length / totalCount) * remainingCount
        );
        const updatedUrlData = gcpData[i].urlData.slice(0, urlDataCount);
        updatedIPFSData[i].urlData = updatedUrlData;
        remainingCount -= updatedUrlData.length;
        count += updatedUrlData.length;
      }
    }
    setIpfsData(updatedIPFSData);
  }
  const handleDownloadGcpData = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    duplicateGcpData.forEach((entry: any, index: any) => {
      // Add date
      doc.setFontSize(16);
      //  doc.setFontStyle('bold');
      doc.text(`Date: ${entry.dataDate}`, 10, yOffset);
      yOffset += 10;

      entry.urlData.forEach((urlEntry: any, urlIndex: any) => {
        let timeSpent;
        if (urlEntry.timespent.length > 1) {
          const totalTimeSpent = urlEntry.timespent.reduce(
            (a: any, b: any) => a + b,
            0
          );
          const totalTimeSpentInSeconds = totalTimeSpent / 1000; // Convert from milliseconds to seconds
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
          const timespentInSeconds = urlEntry.timespent[0] / 1000; // Convert from milliseconds to seconds
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
        }

        // Add URL link
        doc.setFontSize(14);
        //  doc.setFontStyle('normal');
        doc.text(urlEntry.urlLink, 20, yOffset);
        yOffset += 10;

        // Add visit details
        doc.setFontSize(12);
        doc.text(
          `Visited ${urlEntry.timestamps.length} time${
            urlEntry.timestamps.length > 1 ? 's' : ''
          } for ${timeSpent}.`,
          30,
          yOffset
        );
        yOffset += 10;

        const isLastEntry =
          index === gcpData.length - 1 && urlIndex === entry.urlData.length - 1;
        if (!isLastEntry) {
          // Add space between entries
          yOffset += 10;

          // Check if the next entry will be on a new page
          if (yOffset >= doc.internal.pageSize.getHeight()) {
            doc.addPage();
            yOffset = 10;
          }
        }
      });

      // Add space between entries
      yOffset += 10;
    });
    const walletAddress = localStorage.getItem('userPublicAddress');
    doc.save(`gcp_data_${walletAddress}.pdf`);
  };
  const handleDownloadIPFSData = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    duplicateIPFSData.forEach((entry: any, index: any) => {
      // Add date
      doc.setFontSize(16);
      //  doc.setFontStyle('bold');
      doc.text(`Date: ${entry.dataDate}`, 10, yOffset);
      yOffset += 10;

      entry.urlData.forEach((urlEntry: any, urlIndex: any) => {
        let timeSpent;
        if (urlEntry.timespent.length > 1) {
          const totalTimeSpent = urlEntry.timespent.reduce(
            (a: any, b: any) => a + b,
            0
          );
          const totalTimeSpentInSeconds = totalTimeSpent / 1000; // Convert from milliseconds to seconds
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
          const timespentInSeconds = urlEntry.timespent[0] / 1000; // Convert from milliseconds to seconds
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
        }

        // Add URL link
        doc.setFontSize(14);
        //  doc.setFontStyle('normal');
        doc.text(urlEntry.urlLink, 20, yOffset);
        yOffset += 10;

        // Add visit details
        doc.setFontSize(12);
        doc.text(
          `Visited ${urlEntry.timestamps.length} time${
            urlEntry.timestamps.length > 1 ? 's' : ''
          } for ${timeSpent}.`,
          30,
          yOffset
        );
        yOffset += 10;

        const isLastEntry =
          index === gcpData.length - 1 && urlIndex === entry.urlData.length - 1;
        if (!isLastEntry) {
          // Add space between entries
          yOffset += 10;

          // Check if the next entry will be on a new page
          if (yOffset >= doc.internal.pageSize.getHeight()) {
            doc.addPage();
            yOffset = 10;
          }
        }
      });

      // Add space between entries
      yOffset += 10;
    });
    const walletAddress = localStorage.getItem('userPublicAddress');
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
                <h1 className='text-3xl font-semibold'>
                  Your Browser Data on Google Cloud (Centralised Server)
                </h1>
                <select
                  value={dropdownValue}
                  onChange={handleDropdownChange}
                  className='p-2 border border-gray-300 rounded'>
                  <option value='100'>100</option>
                  <option value='50'>50</option>
                  <option value='25'>25</option>
                  <option value='10'>10</option>
                  <option value='5'>5</option>
                </select>
              </div>

              {gcpData &&
                gcpData.length > 0 &&
                gcpData.map((entry: any, index: any) => (
                  <div
                    key={index}
                    className='my-4 border-b-2 border-gray-600 w-full'>
                    <h2 className='text-xl font-medium'>
                      Date: {entry.dataDate}
                    </h2>
                    {entry.urlData.map((urlEntry: any, urlIndex: any) => {
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
                          const minutes = Math.floor(
                            totalTimeSpentInSeconds / 60
                          );
                          timeSpent = `${minutes} minute${
                            minutes > 1 ? 's' : ''
                          }`;
                        } else {
                          const hours = Math.floor(
                            totalTimeSpentInSeconds / 3600
                          );
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
                          timeSpent = `${timespentInSeconds.toFixed(
                            2
                          )} seconds`;
                        } else if (
                          timespentInSeconds >= 60 &&
                          timespentInSeconds < 3600
                        ) {
                          const minutes = Math.floor(timespentInSeconds / 60);
                          timeSpent = `${minutes} minute${
                            minutes > 1 ? 's' : ''
                          }`;
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
                          key={urlIndex}
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
                  </div>
                ))}
              {gcpData && gcpData.length < 1 && (
                <div className='flex justify-center items-center h-full w-full font-semibold text-2xl'>
                  NO GCP DATA to display{' '}
                </div>
              )}
            </div>
          ) : toggleMenu == 'ipfs' ? (
            <div className='w-full'>
              <div className='flex justify-between items-center mb-4 px-10'>
                <h1 className='text-3xl font-semibold'>
                  Your Browser Data on IPFS (Decentralised Server)
                </h1>
                <select
                  value={dropdownValue}
                  onChange={handleDropdownChangeIPFS}
                  className='p-2 border border-gray-300 rounded'>
                  <option value='100'>100</option>
                  <option value='50'>50</option>
                  <option value='25'>25</option>
                  <option value='10'>10</option>
                  <option value='5'>5</option>
                </select>
              </div>

              {ipfsData &&
                ipfsData.length > 0 &&
                ipfsData.map((entry: any, index: any) => (
                  <div
                    key={index}
                    className='py-2 my-4 border-b-2 border-gray-600 w-full'>
                    {entry !== null &&
                      entry.map((urlEntry: any, urlIndex: any) => {
                        // let timeSpent;
                        // if (urlEntry.timespent.length > 1) {
                        //   const totalTimeSpent = urlEntry.timespent.reduce(
                        //     (a: number, b: number) => a + b,
                        //     0
                        //   );
                        //   const totalTimeSpentInSeconds = totalTimeSpent / 1000; // Convert from milliseconds to seconds
                        //   if (totalTimeSpentInSeconds < 60) {
                        //     timeSpent = `${totalTimeSpentInSeconds.toFixed(
                        //       2
                        //     )} seconds`;
                        //   } else if (
                        //     totalTimeSpentInSeconds >= 60 &&
                        //     totalTimeSpentInSeconds < 3600
                        //   ) {
                        //     const minutes = Math.floor(
                        //       totalTimeSpentInSeconds / 60
                        //     );
                        //     timeSpent = `${minutes} minute${
                        //       minutes > 1 ? 's' : ''
                        //     }`;
                        //   } else {
                        //     const hours = Math.floor(
                        //       totalTimeSpentInSeconds / 3600
                        //     );
                        //     const remainingMinutes = Math.floor(
                        //       (totalTimeSpentInSeconds % 3600) / 60
                        //     );
                        //     timeSpent = `${hours} hour${
                        //       hours > 1 ? 's' : ''
                        //     } and ${remainingMinutes} minute${
                        //       remainingMinutes > 1 ? 's' : ''
                        //     }`;
                        //   }
                        // } else {
                        //   const timespentInSeconds = urlEntry.timespent[0] / 1000; // Convert from milliseconds to seconds
                        //   if (timespentInSeconds < 60) {
                        //     timeSpent = `${timespentInSeconds.toFixed(
                        //       2
                        //     )} seconds`;
                        //   } else if (
                        //     timespentInSeconds >= 60 &&
                        //     timespentInSeconds < 3600
                        //   ) {
                        //     const minutes = Math.floor(timespentInSeconds / 60);
                        //     timeSpent = `${minutes} minute${
                        //       minutes > 1 ? 's' : ''
                        //     }`;
                        //   } else {
                        //     const hours = Math.floor(timespentInSeconds / 3600);
                        //     const remainingMinutes = Math.floor(
                        //       (timespentInSeconds % 3600) / 60
                        //     );
                        //     timeSpent = `${hours} hour${
                        //       hours > 1 ? 's' : ''
                        //     } and ${remainingMinutes} minute${
                        //       remainingMinutes > 1 ? 's' : ''
                        //     }`;
                        //   }
                        // }

                        return (
                          <div
                            key={urlIndex}
                            className='py-3 text-lg pl-20'>
                            <p>
                              {urlEntry.urlLink}
                              {/* <Link
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
                            {timeSpent}. */}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                ))}
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
                  <ViewStream /> Download GCP Data
                </button>
                <button
                  className='bg-black rounded px-4 py-2 text-white'
                  onClick={handleDownloadIPFSData}>
                  <Storage /> Download IPFS Data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
