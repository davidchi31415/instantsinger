import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/modal-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getCredits } from '@/lib/credits';
import Head from 'next/head';

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
        <Head>
          <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
          <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
        </Head>
        <body className={rubik.className}>
          <ModalProvider />
          <ToasterProvider />
          <main className="w-full h-full bg-[white] overflow-x-scroll">
            <Navbar convertCredits={convertCredits} />
            <div className="w-full h-full pt-12 md:pt-0">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}