import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full h-20 border-b-2 border-slate-200 px-4">
      <UserButton afterSignOutUrl="/" />
    </header>
  );
};
export default Header;
