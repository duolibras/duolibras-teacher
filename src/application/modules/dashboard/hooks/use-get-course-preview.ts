import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeCourseService } from "../services/make-course-service";

interface IProps {
  courseId?: string;
}

export function useGetCoursePreview({ courseId }: IProps) {
  const queryClient = useQueryClient();
  const courseService = makeCourseService();

  const queryKey = ['course', courseId, 'preview'];

  const { data, isPending, refetch } = useQuery({
    queryKey,
    staleTime: Infinity,
    queryFn: () => courseId && courseService.getCoursePreview.bind(courseService)(courseId),
    enabled: false,
  });

  async function prefetchPreview() {
    await queryClient.prefetchQuery({
      queryKey,
      staleTime: Infinity,
      queryFn: () => courseId && courseService.getCoursePreview.bind(courseService)(courseId)
    });
  }

  return {
    previewUrl: data ?? null,
    isLoading: isPending,
    prefetchPreview, 
    getCoursePreview: refetch,
  }
}