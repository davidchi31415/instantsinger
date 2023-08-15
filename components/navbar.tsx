import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { ConvertCreditCounter } from "./convert-credit-counter";
import { CloneCreditCounter } from "./clone-credit-counter";

interface NavbarProps {
  convertCredits: number;
  cloneCredits: number;
}

const Navbar = ({ convertCredits=0, cloneCredits=0 }: NavbarProps) => {
  return (
    <div className="flex items-center p-4">
        <MobileSidebar convertCredits={convertCredits} cloneCredits={cloneCredits} />
        <div className="flex gap-8 w-full justify-end">
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