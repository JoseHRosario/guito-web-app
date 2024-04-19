import "./globals.css";
import { Inter } from 'next/font/google';
import SessionWrapper from './components/session-wrapper'
import Navigation from './components/navigation'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </SessionWrapper>
  );
}
