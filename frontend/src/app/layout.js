'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactFlowProvider } from 'reactflow';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactFlowProvider>{children}</ReactFlowProvider>
        <ToastContainer position="bottom-center" />
      </body>
    </html>
  );
}
