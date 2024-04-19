import "./globals.css";
import { Inter } from 'next/font/google';
import type { Metadata } from 'next'
import SessionWrapper from './components/session-wrapper'
import Navigation from './components/navigation'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guito Helper',
  description: 'Guito BITCH!!!!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <head>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
