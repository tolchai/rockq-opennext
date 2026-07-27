'use client';

import { usePathname } from 'next/navigation';

import localFont from 'next/font/local';

import Button from '@/components/Button';

import React from 'react';

import '@/styles/main.css';

const sans = localFont({
  variable: '--font-sans',
  // subsets: ['latin'],
  src: [
    {
      path: '../public/fonts/SuisseIntl-Book-WebM.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/SuisseIntl-SemiBold-WebM.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
});

export default function GlobalNotFound() {
  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     window.location.href = '/';
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <html lang='en' className={sans.variable}>
      <body className={`bg-neutral-100 ${sans.variable}`}>
        {/* <Error statusCode={404} />; */}
        <div className='absolute inset-0 flex flex-col items-center justify-center h-screen p-5'>
          <h2 className='h1'>404</h2>
          <p>Page not found.</p>
          {/* <p>Could not find requested resource</p> */}
          <div className='mt-4 '>
            <Button type='link' href='/' label={'Back to homepage'} />
          </div>
        </div>
      </body>
    </html>
  );
}
