import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const UserProgress = ({
  activeCourse,
  hasActiveSubscription,
  hearts,
  points,
}: UserProgressProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
            className="rounded-md border"
          ></Image>
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Image
            src={"/points.svg"}
            alt={"Points"}
            width={28}
            height={28}
            className="mr-2"
          ></Image>
          {points}
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-rose-500">
          <Image
            src={"/heart.svg"}
            alt={"Hearts"}
            width={22}
            height={22}
            className="mr-2"
          ></Image>
          {hasActiveSubscription ? (
            <InfinityIcon className="w-4 h-4 stroke-[3]"></InfinityIcon>
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
export default UserProgress;
