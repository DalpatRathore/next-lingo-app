import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/useExitModal";
import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type HeaderProps = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};

const Header = ({ hearts, percentage, hasActiveSubscription }: HeaderProps) => {
  const { open } = useExitModal();
  return (
    <header className="w-full max-w-[1140px] mx-auto pt-[20px] lg:pt-[50px] px-10 flex items-center justify-between gap-x-7">
      <X
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        onClick={open}
      ></X>
      <Progress value={percentage}></Progress>
      <div className="text-rose-500 flex items-center font-bold">
        <Image
          src={"/heart.svg"}
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        ></Image>
        {hasActiveSubscription ? (
          <InfinityIcon className="w-6 h-6 stroke-[3]"></InfinityIcon>
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
export default Header;
