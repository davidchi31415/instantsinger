"use client";

import { SignInButton, SignOutButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { CloneCreditCounter } from "./clone-credit-counter";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  convertCredits: number;
}

export const MobileNavbar = ({ convertCredits=0 }: NavbarProps) => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth(); // useAuth for client-side
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='p-4 pt-36 z-[9999]'>
        {isSignedIn ?
          <SheetClose asChild>
            <div className="w-fit mx-auto">
              <ConvertCreditCounter convertCredits={convertCredits} />
            </div>
          </SheetClose>
          : ""
        }
        <div className="mt-8 flex flex-col text-xl gap-4 text-center">
          <SheetClose asChild>
            <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? 
                "text-primary" : ""
            }>
                Dashboard
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/pricing" className={pathname === "/pricing" ? 
                "text-primary" : ""
            }>
                Pricing
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/contact" className={pathname === "/contact" ? 
                "text-primary" : ""
            }>
                Contact
            </Link>
          </SheetClose>
          <Link href="https://instant-singer.getrewardful.com/signup">
              Affiliate
          </Link>
        </div>
        {isSignedIn ?
          <div className="flex justify-center mt-6">
            <SignOutButton>
              <SheetClose asChild>
                <Button variant="outline" className="rounded-lg border border-primary text-xl">
                  Sign Out
                </Button>
              </SheetClose>
            </SignOutButton>
          </div>
          :
          <div className="flex justify-center items-center gap-2 mt-6">
              <SignUpButton>
                <SheetClose asChild>
                  <Button variant="default" className="rounded-lg text-xl">
                    Sign Up
                  </Button>
                </SheetClose>
              </SignUpButton>
              <SignInButton>
                <SheetClose asChild>
                  <Button variant="outline" className="rounded-lg border border-primary text-xl">
                    Login
                  </Button>
                </SheetClose>
              </SignInButton>
          </div>
        }
      </SheetContent>
    </Sheet>
  )
}