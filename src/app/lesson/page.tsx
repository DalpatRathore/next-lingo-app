import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "./_components/Quiz";

const LessonPage = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const userSubcriptionData = getUserSubscription();

  const [lesson, userProgress, userSubcription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubcriptionData,
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
      userSubscription={userSubcription}
    ></Quiz>
  );
};
export default LessonPage;
