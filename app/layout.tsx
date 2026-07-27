import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import { GoogleTagManager } from '@next/third-parties/google';
// import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

import 'swiper/css/bundle';
import '@/styles/main.css';
import { AppProvider } from '@/providers/AppProvider';
import { AttributionClient } from '@/components/AttributionClient';
import Script from 'next/script';

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

export default async function RootLayout({ children, params }: Props) {
  return (
    <html lang='en' className={`bg-alabaster-100 ${sans.variable}`}>
      {/* <head>
        <Script
          id='cookiebot'
          src='https://consent.cookiebot.com/uc.js'
          data-cbid='932f2014-46ae-44e0-bb46-2da7e0a200cc'
          data-blockingmode='auto'
          strategy='beforeInteractive'
        />
      </head> */}
      <body>
        <AttributionClient />
        <AppProvider>{children}</AppProvider>
        {/* <GoogleTagManager gtmId='GTM-NTH4T66Z' /> */}
      </body>
    </html>
  );
}
