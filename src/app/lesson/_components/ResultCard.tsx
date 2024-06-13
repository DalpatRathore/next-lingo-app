import { cn } from "@/lib/utils";
import Image from "next/image";

type ResultCardProps = {
  value: number;
  variant: string;
};
const ResultCard = ({ value, variant }: ResultCardProps) => {
  const imageSrc = variant === "hearts" ? "/heart.svg" : "/points.svg";
  return (
    <div
      className={cn(
        "rounded-2xl border-2 w-full",
        variant === "points" && "bg-orange-400 border-orange-400",
        variant === "hearts" && "bg-rose-500 border-rose-500"
      )}
    >
      <div
        className={cn(
          "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
          variant === "points" && "bg-orange-400",
          variant === "hearts" && "bg-rose-500 "
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "rounded-2xl bg-white flex items-center justify-center p-6 font-bold text-lg",
          variant === "points" && "text-orange-400",
          variant === "hearts" && "text-rose-500"
        )}
      >
        <Image
          src={imageSrc}
          width={30}
          height={60}
          alt="icon"
          className="mr-1.5"
        ></Image>
        {value}
      </div>
    </div>
  );
};
export default ResultCard;
