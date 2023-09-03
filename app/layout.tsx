import './globals.css';
import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ModalProvider } from '@/components/modal-provider';
import { ToasterProvider } from '@/components/toaster-provider';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getCredits } from '@/lib/credits';

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instant Singer',
  description: 'Become a singer in less than 30 minutes, using cutting-edge AI technology.',
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
        {/* <CrispProvider /> */}
        <body className={rubik.className}>
          <ModalProvider />
          <ToasterProvider />
          <main className="h-full w-full bg-[white] overflow-auto">
            <Navbar convertCredits={convertCredits} />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}