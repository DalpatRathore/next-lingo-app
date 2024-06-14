import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./_components/Header";
import UserProgress from "@/components/UserProgress";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./_components/Unit";
import { lessons, units as unitsSchema } from "@/db/schema";
import Promo from "@/components/Promo";
import Quests from "@/components/Quests";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const userSubcriptionData = getUserSubscription();

  const [
    userProgress,
    units,
    lessonPercentage,
    courseProgress,
    userSubcription,
  ] = await Promise.all([
    userProgressData,
    unitsData,
    lessonPercentageData,
    courseProgressData,
    userSubcriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }
  const isPro = !!userSubcription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubcription?.isActive}
        ></UserProgress>
        {!isPro && <Promo></Promo>}
        <Quests points={userProgress.points}></Quests>
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title}></Header>
        {units.map(unit => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={
                courseProgress.activeLesson as
                  | (typeof lessons.$inferSelect & {
                      unit: typeof unitsSchema.$inferSelect;
                    })
                  | undefined
              }
              activeLessonPercent={lessonPercentage}
            ></Unit>
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};
export default LearnPage;
