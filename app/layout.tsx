import type { Metadata } from 'next';
import './globals.css';
import HeaderComponent from '@/components/HeaderComponent';
import FooterComponent from '@/components/FooterComponent';
import { ReduxProvider } from './providers';
import { inter } from './fonts'

export const metadata: Metadata = {
  title: 'Todo Management App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <HeaderComponent />
          {children}
        </ReduxProvider>
        <FooterComponent />
      </body>
    </html>
  );
}
