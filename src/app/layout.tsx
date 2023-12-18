'use client';
import { AuthContextProvider } from '@/context/AuthContext';
import { ILocalizationProvider } from '@/localization';
import { Bebas_Neue, Fredoka } from 'next/font/google';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';
import AppProvider from '@/redux/AppProvider';

const fredoka = Fredoka({
  weight: '600',
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
        <html lang="en" className={`${fredoka.className} bg-green-custom`}>
          <body className="min-h-screen">
            <AuthContextProvider>
              <Header />
              {children}
              <Footer />
            </AuthContextProvider>
          </body>
        </html>
      </ILocalizationProvider>
    </AppProvider>
  );
}
