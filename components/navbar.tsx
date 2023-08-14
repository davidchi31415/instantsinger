import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { CloneCreditCounter } from "./clone-credit-counter";

interface NavbarProps {
  convertCreditCount: number;
  cloneCreditCount: number;
}

const Navbar = ({ convertCreditCount=0, cloneCreditCount=0 }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
        <MobileSidebar />
        <div className="flex gap-8 w-full justify-end">
            <div className="flex gap-2">
              <CloneCreditCounter cloneCreditCount={cloneCreditCount} />
              <ConvertCreditCounter convertCreditCount={convertCreditCount} />
            </div>
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
        </div>
    </div>
  )
}

export default Navbar;