'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  openedContactOverlay: boolean;
  setOpenedContactOverlay: (value: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  openedContactOverlay: false,
  setOpenedContactOverlay: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [openedContactOverlay, setOpenedContactOverlay] =
    useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        openedContactOverlay,
        setOpenedContactOverlay,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
