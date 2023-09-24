import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/modal-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { Navbar } from '@/components/navbar';
import { getCredits } from '@/lib/credits';

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instant Singer',
  description: 'Become a singer in 2 minutes, using cutting-edge AI technology.',
  icons: {
    icon: [
      { url: "/static/favicon-16x16.png", sizes: "16x16", type: "image" },
      { url: "/static/favicon-32x32.png", sizes: "32x32", type: "image" }
    ],
    shortcut: "/static/favicon.ico",
    apple: "/static/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/static/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "android-chrome",
        url: "/static/android-chrome-512x512.png",
        sizes: "512x512"
      }
    ]
  }
}


const getUserData = async () => {
  return await getCredits();
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { convertCredits } = await getUserData();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={rubik.className}>
          <ModalProvider />
          <ToasterProvider />
          <div className="w-full h-full pt-12 md:pt-0 overflow-x-clip">
            <Navbar convertCredits={convertCredits} />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}