import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white"></Menu>
      </SheetTrigger>
      <SheetContent className="p-0 z-[100]" side="left">
        <Sidebar></Sidebar>
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
