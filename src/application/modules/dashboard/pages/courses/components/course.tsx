import { AspectRatio } from "@/application/shared/components/ui/aspect-ratio";
import { Button } from "@/application/shared/components/ui/button";
import { Card } from "@/application/shared/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/application/shared/components/ui/dropdown-menu";
import { Archive, ArchiveRestore, BookCopy, MoreHorizontal, Pencil, Trash2, User2 } from "lucide-react";
import { useDeleteCourse } from "../../../hooks/use-delete-course";
import { SummaryCourse } from "../../../services/dto/course-dto";

interface IProps {
  course: SummaryCourse;
}

export function Course({ course }: IProps) {
  const { deleteCourse } = useDeleteCourse();

  return (
    <Card className="flex flex-col gap-2 max-w-[600px]">
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

          <span className="text-muted-foreground">
            {course.description}
          </span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User2 className="size-4" /> <span>{course.studentsCount}</span>
            </div>

            <div className="flex items-center gap-2">
              <BookCopy className="size-4" /> <span>{course.classCount}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 rounded-lg"
              // side={isMobile ? "bottom" : "right"}
              // align={isMobile ? "end" : "start"}
            >
              <DropdownMenuItem>
                <Pencil className="text-muted-foreground" />
                <span>Editar curso</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {course.archived 
                  ? (<ArchiveRestore className="text-muted-foreground" />)
                  : (<Archive className="text-muted-foreground" />)}
              <span>{course.archived ? 'Recuperar' : 'Arquivar'}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => deleteCourse(course.id)}>
                <Trash2 className="text-destructive" />
                <span>Remover curso</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>
    </Card>
  );
}