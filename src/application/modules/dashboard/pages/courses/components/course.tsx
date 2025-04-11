import { CardMoreButton } from "@/application/shared/components/card-more-button";
import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Card } from "@/application/shared/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/application/shared/components/ui/tooltip";
import { useStore } from "@/main/store/use-store";
import { BookCopy, User2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useDeleteCourse } from "../../../hooks/use-delete-course";
import { useSetCourse } from "../../../hooks/use-set-course";
import { SummaryCourse } from "../../../services/dto/course-dto";

interface IProps {
  course: SummaryCourse;
}

export function Course({ course }: IProps) {
  const { deleteCourse } = useDeleteCourse();
  const navigate = useNavigate();
  const { setCourse } = useSetCourse();
  const { setId } = useStore();

  function handleClickCourse() {
    navigate(`/dashboard/course/${course.id}`);
    setId(course.id, course.name);
    setCourse({ course });
  }

  return (
    <Card 
      className="flex flex-col gap-2 max-w-[600px] conteúdor-pointer" 
      onClick={handleClickCourse}
    >
      {course.bannerUrl && (
        <div className="max-w-[600px] w-full">
          <AspectRatio ratio={16 / 9}>
            <img src={course.bannerUrl} alt="Preview" className="w-full rounded-md" />
          </AspectRatio>
        </div>
      )}

      <div className="flex flex-col justify-between p-4 ">
        <div className="flex flex-col">
          <strong>
            {course.name}
          </strong>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground truncate">
                  {course.description}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                {course.description}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2 text-muted-foreground h-full">
            <div className="flex items-center gap-2 h-full">
              <User2 className="size-4" /> <span>{course.studentsCount}</span>
            </div>

            <div className="flex items-center gap-2 h-full">
              <BookCopy className="size-4" /> <span>{course.classCount}</span>
            </div>
          </div>

          <CardMoreButton
            label="conteúdo"
            archived={course.archived}
            deleteFn={() => deleteCourse(course.id)}
          />
        </div>

      </div>
    </Card>
  );
}