"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import Header from "./Header";
import { MessageCircleQuestion, ShieldQuestion } from "lucide-react";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";

type QuizProps = {
  initialPercent: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription: any;
};
const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercent,
  userSubscription,
}: QuizProps) => {
  const [hearts, setHearts] = useState(initialHearts);

  const [percentage, setPercentage] = useState(initialPercent);

  const [challenges, setChallenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompeletedIndex = challenges.findIndex(
      challenge => !challenge.completed
    );
    return unCompeletedIndex === -1 ? 0 : unCompeletedIndex;
  });
  const challenge = challenges[activeIndex];

  const options = challenge?.challengeOptions ?? [];

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percentage}
        hasActiveSubscription={!!userSubscription?.isActive}
      ></Header>
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
            <h1 className="flex items-center text-lg lg:text-3xl text-center lg:text-start font-bold text-netural-700">
              <ShieldQuestion className="w-8 h-8 mr-2"></ShieldQuestion>
              {title}
            </h1>
            <div className="">
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question}></QuestionBubble>
              )}
              <Challenge
                options={options}
                onSelect={() => {}}
                status="none"
                selectedOption={undefined}
                disabled={false}
                type={challenge.type}
              ></Challenge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Quiz;
