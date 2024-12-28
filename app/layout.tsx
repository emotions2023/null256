// アプリ全体の共通レイアウト

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LoadingScreen from '@/components/comon/LoadingScreen';
import { ChatBot } from '@/components/features/Chatbot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NULL256',
  description: 'AIと人間の共創で、無限の可能性を切り開く',
  icons: {
    icon: [
      { url: '/img/favicon.svg', type: 'image/svg+xml' }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${inter.className} bg-white`}>
        <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/helix.js"
        ></script>
        <LoadingScreen />
        {children}
        <ChatBot />
      </body>
    </html>
  );
}