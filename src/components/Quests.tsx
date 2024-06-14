import { quests } from "@/constant/constant";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "./ui/progress";

type QuestsProps = {
  points: number;
};

const Quests = ({ points }: QuestsProps) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href={"/quests"}>
          <Button variant={"primaryOutline"} size={"sm"}>
            View All
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4">
        {quests.map(quest => {
          const progress = (points / quest.value) * 100;
          return (
            <div
              className="flex items-center w-full pb-4 gap-4"
              key={quest.title}
            >
              <Image
                src={"/points.svg"}
                width={40}
                height={40}
                alt="Points"
              ></Image>
              <div className="flex flex-col gap-y-1 w-full">
                <p className="text-neutral-700 text-base font-bold">
                  {quest.title}
                </p>
                <Progress value={progress}></Progress>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default Quests;
