"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/useHeartsModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const HeartsModal = () => {
  const { isOpen, close } = useHeartsModal();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleClick = () => {
    close();
    router.push("/store");
  };

  if (!isClient) {
    return null;
  }
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-full mb-5">
            <Image
              src={"/mascot_bad.svg"}
              alt="Mascot"
              width={80}
              height={80}
            ></Image>
          </div>
          <DialogTitle className="text-center font-bold text-2xl">
            You ran out of hearts
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Get pro for unlimited hearts, or purchase them in the store.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex flex-col gap-y-4 w-full">
            <Button
              variant={"primary"}
              size={"lg"}
              className="w-full"
              onClick={handleClick}
            >
              Get Unlimited Hearts
            </Button>
            <Button
              variant={"primaryOutline"}
              size={"lg"}
              className="w-full"
              onClick={() => {
                close();
              }}
            >
              No Thanks!
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default HeartsModal;
