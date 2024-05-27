'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

interface sessionContext {
  accessToken: string | null,
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>
}

const SessionContext = createContext<sessionContext | null>(null);
export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [accessToken, setAccessToken] = useState<string | null>('')
  useEffect(() => {
    setAccessToken(localStorage.getItem('accessToken'))
    console.log(accessToken)
  }, [])
  return (
    <SessionContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </SessionContext.Provider>
  );
};
export const useSession = () => useContext(SessionContext);

