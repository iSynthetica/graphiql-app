'use client';
import { ILocalizationProvider } from '@/localization';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';
import { Fredoka, Bebas_Neue, Roboto_Condensed } from 'next/font/google';
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
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </ILocalizationProvider>
    </AppProvider>
  );
}
