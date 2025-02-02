
import { LucideBox } from "lucide-react";

import { useGetCourses } from "../../hooks/use-get-courses";
import { Course } from "./components/course";
import { CreateCourseModal } from "./components/create-course-modal";

export function Courses() {
  const { courses, isLoading } = useGetCourses({ creator: true });

  return (
    <>
      {(courses.length === 0 && !isLoading) && (
        <div className="flex h-full items-center justify-center flex-col space-y-4" >
          <LucideBox className="size-40" />
          Você ainda não tem nenhum curso
          <CreateCourseModal>Criar meu primeiro curso</CreateCourseModal>
        </div>
      )}

      {(courses.length > 0 && !isLoading) && (
        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="tracking-tight text-3xl mb-4">Meus cursos</h1>
            <CreateCourseModal>Criar curso</CreateCourseModal>
          </div>
          <div className="gap-4 grid grid-cols-3">
            {courses.map((course) => <Course key={course.id} course={course} />)}
          </div>
        </div>
      )}
    </>
  );
}