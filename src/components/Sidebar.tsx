"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

type SidebarProps = {
  className?: string;
};
const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2",
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/mascot.svg" height={40} width={40} alt="mascot"></Image>
          <h1 className="text-lg font-extrabold text-green-600 tracking-wide">
            Next Lingo App
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        <SidebarItem
          label="Learn"
          href="/learn"
          iconSrc="/learn.svg"
        ></SidebarItem>
        <SidebarItem
          label="Leaderboard"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        ></SidebarItem>
        <SidebarItem
          label="Quests"
          href="/quests"
          iconSrc="/quests.svg"
        ></SidebarItem>
        <SidebarItem
          label="Shop"
          href="/shop"
          iconSrc="/shop.svg"
        ></SidebarItem>
      </div>
      <div className="p-4 flex flex-col items-start justify-center gap-y-4">
        <ClerkLoading>
          <Loader2 className="w- h-5 text-muted-foreground animate-spin"></Loader2>
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton afterSignOutUrl="/"></UserButton>
        </ClerkLoaded>
        <ThemeToggle></ThemeToggle>
      </div>
    </div>
  );
};
export default Sidebar;
