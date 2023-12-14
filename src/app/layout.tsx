import { AuthContextProvider } from '@/context/AuthContext';
import Footer from './components/footer';
import Header from './components/header';
import './globals.css';
import { Fredoka, Bebas_Neue } from 'next/font/google';

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
    <html lang="en" className={`${fredoka.className} bg-green-custom`}>
      <body className="min-h-screen">
        <AuthContextProvider>
          <Header />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
