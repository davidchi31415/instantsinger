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
  description: 'Become a singer in 10 minutes, using cutting-edge AI technology.',
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
          <div className="w-full h-full pt-12 md:pt-0">
            <Navbar convertCredits={convertCredits} />
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}