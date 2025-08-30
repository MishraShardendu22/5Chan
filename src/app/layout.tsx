import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './globals.css';
import AuthProvider from '@/components/authProvider';

const geistSans = Geist({
 variable: '--font-geist-sans',
 subsets: ['latin'],
});

const geistMono = Geist_Mono({
 variable: '--font-geist-mono',
 subsets: ['latin'],
});

export const metadata: Metadata = {
 title: {
  template: '%s | 5Chan',
  default: '5Chan - Made By Shardendu Mishra',
 },
 description:
  'Anonymous Messaging | Sometimes Roasting, Sometimes Toasting - Made With Love By Shardendu Mishra Using Next.js 15',
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Support the Creator Button - Modern Card UI */}
        <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-center">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 border border-gray-700 shadow-xl rounded-xl p-4 flex flex-col items-center gap-3 w-56">
            <span className="text-lg font-semibold text-white mb-1">Support the Creator</span>
            <Link href="https://monadpe.vercel.app/pay/48b206bf-837e-4c40-a3a2-55e3d6964b2f?merchant=0x2Ec66F3a1F879d985b23b7f66FA49B42D51C417e&amount=0.01&token=0x0000000000000000000000000000000000000000&tokenSymbol=MON" target="_blank" rel="noopener noreferrer" className="w-full">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-bold shadow transition-all duration-150 mb-2">
                Donate the Creator
              </button>
            </Link>
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-300 mb-1">Scan QR to support</span>
              <Link href="https://monadpe.vercel.app/pay/48b206bf-837e-4c40-a3a2-55e3d6964b2f?merchant=0x2Ec66F3a1F879d985b23b7f66FA49B42D51C417e&amount=0.01&token=0x0000000000000000000000000000000000000000&tokenSymbol=MON" target="_blank" rel="noopener noreferrer">
                <Image src="/qr.jpeg" alt="Scan QR to support" width={80} height={80} className="rounded-lg shadow-md border border-gray-600" />
              </Link>
            </div>
          </div>
        </div>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
