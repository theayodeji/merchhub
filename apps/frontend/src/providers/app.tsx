import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from '../lib/react-query';
import { Toaster } from '@merchhub/ui';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<div className="flex items-center justify-center w-screen h-screen"><h1 className="text-2xl font-black uppercase">Loading...</h1></div>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </React.Suspense>
  );
};
