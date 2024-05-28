'use client'
import axios, { AxiosError } from 'axios';
import router from 'next/router';
import React, { createContext, useReducer, useContext, useEffect, useState } from 'react';
import { baseUrl, authApi } from '../api';
import { Login } from '../interfaces/login';
import { Logout } from '../api/rest/auth/logout';

// Create context for reducer
export const AuthContext = createContext<{
  login: (data: Login) => void
  logout: () => void
  getToken: () => string
  loading: boolean
} | null>(null);

// Provider component to provide reducer and state
export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true);
  const getToken = (): string => {
    return token
  }

  const login = async (data: Login) => {
    try {
      const res = await axios({
        url: `${baseUrl+authApi.login}`,
        method: 'POST',
        data: data,
        withCredentials: true
      })
      setToken(res.data.accessToken)
      localStorage.setItem('accessToken', res.data.accessToken)
    } catch (error) {
      console.log(error)
      if (axios.isAxiosError(error)) {
        throw error;
      } else {
        throw new Error('Error');
      }
    }
  }
  const logout = async () => {
    try {
      await axios({
        url: `${baseUrl + authApi.logout}`,
        method: 'POST',
        withCredentials: true,
      })
      localStorage.removeItem('accessToken')
      setToken('')
    } catch (error: any) {
      console.log(error)
      throw Error(error)
    }
  }
useEffect(() => {
  const token = localStorage.getItem('accessToken')
  if(token !== null) {
    setToken(token)
  }
  setLoading(false);
}, [])
  return (
    <AuthContext.Provider value={{login, getToken, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
