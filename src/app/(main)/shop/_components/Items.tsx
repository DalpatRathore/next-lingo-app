"use client";

import { refillHearts } from "@/actions/userProgress";
import { createStripeUrl } from "@/actions/userSubscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constant/constant";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong!"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then(response => {
          if (response.data) {
            window.location.href = response.data;
          }
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src={"/heart.svg"} width={60} height={60} alt="Heart"></Image>

        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-sl font-bold">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
        >
          {hearts === 5 ? (
            "Full"
          ) : (
            <div className="flex items-center">
              <Image
                src={"/points.svg"}
                width={20}
                height={20}
                alt="points"
              ></Image>
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full gap-x-4 p-4 pt-8 border-t-2">
        <Image
          src={"/unlimited.svg"}
          alt="Unlimited"
          height={60}
          width={60}
        ></Image>
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-sl font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </div>
  );
};
export default Items;
