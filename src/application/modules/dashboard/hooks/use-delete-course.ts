import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { makeCourseService } from "../services/make-course-service";

export function useDeleteCourse() {
  const coursesService = makeCourseService();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: coursesService.deleteCourse.bind(coursesService),
    onSuccess: () => {
      toast.success('conteúdo removido com sucesso');
      queryClient.invalidateQueries({
        queryKey: ['courses']
      });
    },
    onError: () => toast.error('Erro ao remover conteúdo'),
  });

  return {
    deleteCourse: mutateAsync,
    isLoading: isPending,
  }
}