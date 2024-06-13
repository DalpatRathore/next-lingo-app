import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "../_components/Quiz";

type LessonIdPageProps = {
  params: {
    lessonId: number;
  };
};

const LessonIdPage = async ({ params }: LessonIdPageProps) => {
  const lessonData = getLesson(params.lessonId);
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercent =
    (lesson.challenges.filter(challenge => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercent={initialPercent}
      userSubscription={null}
    ></Quiz>
  );
};
export default LessonIdPage;
