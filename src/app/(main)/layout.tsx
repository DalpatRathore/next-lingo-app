import MobileHeader from "@/components/MobileHeader";
import Sidebar from "@/components/Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MobileHeader></MobileHeader>
      <Sidebar className="hidden lg:flex"></Sidebar>
      <main className="h-full lg:pl-[256px] pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};
export default MainLayout;
