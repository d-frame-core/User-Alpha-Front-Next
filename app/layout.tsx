/** @format */

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { AppContextProvider } from '@/context/Context';
import Middleware from '@/middleware/Middleware';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'D Frame User Dashboard',
  description:
    'Join D Frame for the Universal Basic Income (UBI) revolution on Blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppContextProvider>
          <Toaster />
          <Middleware />
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
