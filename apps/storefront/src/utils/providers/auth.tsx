'use client'
import axios, { AxiosError } from 'axios';
import router from 'next/router';
import React, { createContext, useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Account } from '../interfaces/account';
import { refreshToken } from '../api/rest/auth/refreshToken';
import { LogoutApi } from '../api/rest/auth/logout';

// Create context for reducer
export const AuthContext = createContext<{
  token: string
  setToken: Dispatch<SetStateAction<string>>
  loading: boolean
  account: Account | null
  setAccount: Dispatch<SetStateAction<Account | null>>
} | null>(null);

// Provider component to provide reducer and state
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<Account | null>(null);

const refresh = async () => {
  try {
    const resData = await refreshToken()
    setToken(resData.accessToken)
  } catch (error) {
    LogoutApi()
  }
}

useEffect(() => {
  const token = localStorage.getItem('accessToken')
  if(token !== null) {
    setToken(token)
  } else {
      refresh()
  }
  setLoading(false);
}, [])
  return (
    <AuthContext.Provider value={{loading, token, setToken, account, setAccount}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext( AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
