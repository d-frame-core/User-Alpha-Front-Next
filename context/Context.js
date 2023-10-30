/** @format */
'use client';
import React, { createContext, useState } from 'react';

const AppContext = createContext();

function AppContextProvider(props) {
  const [toggleTab, setToggleTab] = useState('profile');
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const [userData, setUserData] = useState(null);
  const [userToken, setUserToken] = useState('');

  return (
    <AppContext.Provider
      value={{
        toggleTab,
        setToggleTab,
        userWalletAddress,
        setUserWalletAddress,
        userData,
        setUserData,
        userToken,
        setUserToken,
      }}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider, AppContext };
