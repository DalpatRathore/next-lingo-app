import { lessons, units } from "@/db/schema";
import UnitBanner from "./UnitBanner";
import LessonButton from "./LessonButton";

type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
  })[];
  activeLesson:
    | (typeof lessons.$inferSelect & {
        unit: typeof units.$inferSelect;
      })
    | undefined;

  activeLessonPercent: number;
};

const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercent,
}: UnitProps) => {
  return (
    <>
      <UnitBanner title={title} description={description}></UnitBanner>
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercent}
            ></LessonButton>
          );
        })}
      </div>
    </>
  );
};
export default Unit;
