"use client";

import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import { useState, useTransition } from "react";
import Header from "./Header";
import { ShieldQuestion } from "lucide-react";
import QuestionBubble from "./QuestionBubble";
import Challenge from "./Challenge";
import Footer from "./Footer";
import { upsertChallengeProgress } from "@/actions/challengeProgress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/userProgress";
import { useAudio, useWindowSize, useMount } from "react-use";
import Image from "next/image";
import ResultCard from "./ResultCard";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModal } from "@/store/useHeartsModal";
import { usePracticeModal } from "@/store/usePracticeModal";

type QuizProps = {
  initialPercent: number;
  initialHearts: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & { isActive: boolean })
    | null;
};
const Quiz = ({
  initialHearts,
  initialLessonChallenges,
  initialLessonId,
  initialPercent,
  userSubscription,
}: QuizProps) => {
  const router = useRouter();

  const { width, height } = useWindowSize();
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });

  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });

  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const { open: openHeartsModal } = useHeartsModal();
  const { open: openPracticeModal } = usePracticeModal();

  useMount(() => {
    if (initialPercent === 100) {
      openPracticeModal();
    }
  });
  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);

  const [lessonId, setLessonId] = useState(initialLessonId);

  const [percentage, setPercentage] = useState(() => {
    return initialPercent === 100 ? 0 : initialPercent;
  });

  const [challenges, setChallenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const unCompeletedIndex = challenges.findIndex(
      challenge => !challenge.completed
    );
    return unCompeletedIndex === -1 ? 0 : unCompeletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];

  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex(current => current + 1);
  };

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find(option => option.correct);

    if (!correctOption) {
      return;
    }

    if (correctOption && correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id)
          .then(response => {
            if (response?.error === "hearts") {
              console.log("Missing hearts");
              openHeartsModal();
              return;
            }
            correctControls.play();
            setStatus("correct");
            setPercentage(prev => prev + 100 / challenges.length);

            // This is practice
            if (initialPercent === 100) {
              setHearts(prev => Math.min(prev + 1, 5));
            }
          })
          .catch(() => toast.error("Something went wrong, please try again!"));
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id)
          .then(response => {
            if (response?.error === "hearts") {
              console.error("Missing hearts");
              openHeartsModal();
              return;
            }
            incorrectControls.play();

            setStatus("wrong");

            if (!response?.error) {
              setHearts(prev => Math.max(prev - 1, 0));
            }
          })
          .catch(() => toast.error("Something went wrong, Please try again!"));
      });
    }
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <Confetti
          recycle={false}
          numberOfPieces={1500}
          tweenDuration={10000}
          width={width}
          height={height}
        ></Confetti>
        <div className="flex flex-col gap-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image
            src={"/finish.svg"}
            alt="finish"
            className="hidden lg:block"
            width={100}
            height={100}
          ></Image>
          <Image
            src={"/finish.svg"}
            alt="finish"
            className="block lg:hidden"
            width={50}
            height={50}
          ></Image>
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>
          <div className="flex items-center gap-x-4 w-full">
            <ResultCard
              variant="points"
              value={challenges.length * 10}
            ></ResultCard>
            <ResultCard variant="hearts" value={hearts}></ResultCard>
          </div>
        </div>
        <Footer
          status={"completed"}
          lessonId={lessonId}
          onCheck={() => router.push("/learn")}
        ></Footer>
      </>
    );
  }

  const title =
    challenge.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge.question;

  return (
    <>
      {incorrectAudio}
      {correctAudio}
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
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={pending}
                type={challenge.type}
              ></Challenge>
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={pending || !selectedOption}
        status={status}
        onCheck={onContinue}
      ></Footer>
    </>
  );
};
export default Quiz;
