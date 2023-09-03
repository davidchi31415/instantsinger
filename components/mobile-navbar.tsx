"use client";

import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { CloneCreditCounter } from "./clone-credit-counter";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
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
      <SheetContent side='right' className='p-4 pt-14'>
        {isSignedIn ?
          <div className="mt-4 flex gap-2">
            <UserButton afterSignOutUrl="/" 
              appearance={{
                  elements: {
                  userButtonAvatarBox: {
                      width: 48,
                      height: 48
                  }
                  }
              }}
            />
            <ConvertCreditCounter convertCredits={convertCredits} />
          </div>
          :
          <div className="flex items-center gap-x-2">
              <SignUpButton mode="modal">
                  <Button variant="default" className="rounded-lg">
                      Sign Up
                  </Button>
              </SignUpButton>
              <div className="hidden md:block">
                  <SignInButton mode="modal">
                      <Button variant="outline" className="rounded-lg border border-primary">
                          Login
                      </Button>
                  </SignInButton>
              </div>
          </div>
        }
        <div className="mt-8 flex flex-col text-xl gap-4">
            <Link href="/dashboard" className={pathname.startsWith("/dashboard") ? 
                "text-primary" : ""
            }>
                Dashboard
            </Link>
            <Link href="/pricing" className={pathname === "/pricing" ? 
                "text-primary" : ""
            }>
                Pricing
            </Link>
            <Link href="/contact" className={pathname === "/contact" ? 
                "text-primary" : ""
            }>
                Contact
            </Link>
          </div>
      </SheetContent>
    </Sheet>
  )
}