import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader></MobileHeader>
      <Sidebar className="hidden lg:flex"></Sidebar>
      <main className="h-full lg:pl-[256px] pt-[50px] lg:pt-0">{children}</main>
    </>
  );
};
export default MainLayout;
