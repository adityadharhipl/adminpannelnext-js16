"use client";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import './global.css'


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeContextProvider>
            {children}
            <ToastContainer />
          </ThemeContextProvider>
        </Provider>
      </body>
    </html>
  );
}
