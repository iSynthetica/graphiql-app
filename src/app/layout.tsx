'use client';
import { AuthContextProvider } from '@/context/AuthContext';
import { ILocalizationProvider } from '@/localization';
import { Bebas_Neue, Comfortaa, Fredoka } from 'next/font/google';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';
import AppProvider from '@/redux/AppProvider';

const comfort = Comfortaa({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
});

const bebas = Bebas_Neue({
  weight: '400',
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
              <Footer />
            </AuthContextProvider>
          </body>
        </html>
      </ILocalizationProvider>
    </AppProvider>
  );
}
