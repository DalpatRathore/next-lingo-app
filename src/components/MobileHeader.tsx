import MobileSidebar from "./MobileSidebar";

const MobileHeader = () => {
  return (
    <nav className="lg:hidden w-full h-[50px] flex items-center bg-green-500 border-b fixed top-0 z-50 px-6">
      <MobileSidebar></MobileSidebar>
    </nav>
  );
};
export default MobileHeader;
