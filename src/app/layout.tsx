'use client';
import { AuthContextProvider } from '@/context/AuthContext';
import { ILocalizationProvider } from '@/localization';
import AppProvider from '@/redux/AppProvider';
import { Comfortaa } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';

const comfort = Comfortaa({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ILocalizationProvider>
        <html
          lang="en"
          className={`${comfort.className} bg-gray-800 lg:bg-green-custom`}
        >
          <body className="flex flex-col min-h-screen justify-between">
            <AuthContextProvider>
              <Header />
              <main className="my-auto pt-16">{children}</main>
              <ToastContainer position="bottom-left" />
              <Footer />
            </AuthContextProvider>
          </body>
        </html>
      </ILocalizationProvider>
    </AppProvider>
  );
}
