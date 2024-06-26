"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

type SidebarProps = {
  label: string;
  iconSrc: string;
  href: string;
};
const SidebarItem = ({ label, iconSrc, href }: SidebarProps) => {
  const pathname = usePathname();

  const active = pathname === href;
  return (
    <Button
      variant={active ? "sidebarOutline" : "sidebar"}
      className="justify-start h-[52px]"
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          width={32}
          height={32}
          alt={label}
          className="mr-5"
        ></Image>
        {label}
      </Link>
    </Button>
  );
};
export default SidebarItem;
