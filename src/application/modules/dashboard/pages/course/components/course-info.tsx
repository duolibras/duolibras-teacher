import { CardMoreButton } from "@/application/shared/components/card-more-button";
import { BookCopy, User2 } from "lucide-react";
import { useDeleteCourse } from "../../../hooks/use-delete-course";
import { useCoursePageContext } from "../contexts/course-page-context";

export function CourseInfo() {
  const { course } = useCoursePageContext();
  const { deleteCourse } = useDeleteCourse();
  
  return (
    <div className="w-full justify-between flex flex-col">
      <div className="flex w-full justify-between gap-4">
        <div>
          <strong className="text-xl">{course.name}</strong>

          <p className="text-muted-foreground">{course.description}</p>
        </div>

        <CardMoreButton 
          label="conteúdo"
          archived={course.archived}
          deleteFn={() => deleteCourse(course.id)}
        />
      </div>

      <div>
        <div className="flex gap-2 text-muted-foreground h-full">
          <div className="flex items-center gap-2 h-full">
            <User2 className="size-4" /> <span>{course.studentsCount}</span>
          </div>

          <div className="flex items-center gap-2 h-full">
            <BookCopy className="size-4" /> <span>{course.classCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}