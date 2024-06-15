import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Loader, Loader2 } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full h-20 border-b-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="mascot"></Image>
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Next Lingo App
          </h1>
        </div>
        <ClerkLoading>
          <Loader2 className="w-5 h-5 text-muted-foreground animate-spin"></Loader2>
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton
              mode="modal"
              afterSignInUrl="/learn"
              afterSignUpUrl="/learn"
            >
              <Button size="lg" variant="ghost">
                Login
              </Button>
            </SignInButton>
          </SignedOut>
        </ClerkLoaded>
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
};
export default Header;
