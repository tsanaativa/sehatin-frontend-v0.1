import type { Metadata } from 'next';
import { Poppins, Nunito } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sehatin',
  description:
    'A digital healthcare solution that facilitates remote medical consultations, while also offering a convenient service for patients to order and purchase prescription medications online.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.className}`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
