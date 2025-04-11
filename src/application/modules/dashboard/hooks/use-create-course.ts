import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeCourseService } from "../services/make-course-service";

export function useCreateCourse() {
  const courseService = makeCourseService();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: courseService.createCourse.bind(courseService),
    onError: () => toast.error('Algo deu errado ao criar o conteúdo'),
  });

  return {
    createCourse: mutateAsync,
    isLoading: isPending,
  }
}