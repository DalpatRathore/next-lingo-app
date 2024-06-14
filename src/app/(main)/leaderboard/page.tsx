import FeedWrapper from "@/components/FeedWrapper";
import Promo from "@/components/Promo";
import StickyWrapper from "@/components/StickyWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import UserProgress from "@/components/UserProgress";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderBoardPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const topTenUsersData = getTopTenUsers();
  const [userProgress, userSubscription, topTenUsers] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    topTenUsersData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        ></UserProgress>
        {!isPro && <Promo></Promo>}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/leaderboard.svg"}
            width={90}
            height={90}
            alt="Leaderboard"
          ></Image>
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full"></Separator>
          {topTenUsers.map((userProgress, i) => (
            <div
              className="flex items-center w-full p-2 px-4 rounded-xl border hover:bg-gray-200/50"
              key={userProgress.userId}
            >
              <p className="font-bold text-lime-700 mr-4">{i + 1}</p>

              <Avatar className="border bg-green-500 h-12 w-12 ml-1 mr-6">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                ></AvatarImage>
                <AvatarFallback>DR</AvatarFallback>
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
};
export default LeaderBoardPage;
