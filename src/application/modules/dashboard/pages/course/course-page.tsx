
import { useGetClasses } from "@/application/modules/classes/hooks/use-get-classes";
import { GoBackButton } from "@/application/shared/components/go-back-button";
import { Button } from "@/application/shared/components/ui/button";
import { Card } from "@/application/shared/components/ui/card";
import { LucideBox, Plus } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router";
import { useGetCourse } from "../../hooks/use-get-course";
import { ClassCard } from "./components/class-card";
import { CourseInfo } from "./components/course-info";
import { Preview } from "./components/preview";
import { CoursePageProvider } from "./contexts/course-page-context";

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const { course, isLoading } = useGetCourse({ courseId });
  
  const { classes } = useGetClasses({ courseId });

  if (isLoading) {
    return <div>Carregando...</div>
  }

  if (!course) {
    return <Navigate to="/dashboard" replace  />
  }
  
  return (
    <CoursePageProvider course={course}>
      <div className="h-full w-full flex py-4 flex-col items-start">
        <GoBackButton />

        <div className="px-4 w-full h-full">
          <Card className="w-full overflow-hidden p-4 flex gap-4 max-w-screen-lg mx-auto">
            <Preview />

            <CourseInfo />
          </Card>

          <div className="max-w-screen-lg mx-auto w-full mt-4">
            <div className="w-full flex justify-between">
              <h2 className="text-2xl">Aulas</h2>

              <Button onClick={() => navigate(`/dashboard/course/${courseId}/create-class`)}>
                <Plus />
                Adicionar aula
              </Button>
            </div>

            {classes.length === 0 && (
              <div className="flex h-full items-center justify-center flex-col space-y-4 mt-10" >
                <LucideBox className="size-40" />
                Esse conteúdo ainda não tem nenhuma aula
              </div>
            )}

            {classes.length > 1 && (
              <div className="grid grid-cols-3 gap-4 mt-10">
                {classes.map((courseClass) => (
                  <ClassCard courseClass={courseClass} />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </CoursePageProvider>
  );
}