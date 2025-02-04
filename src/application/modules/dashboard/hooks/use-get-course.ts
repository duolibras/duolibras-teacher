import { useQuery } from "@tanstack/react-query";
import { makeCourseService } from "../services/make-course-service";

interface IProps {
  courseId?: string;
}

export function useGetCourse({ courseId }: IProps) {
  const courseService = makeCourseService();

  const { data, isPending } = useQuery({
    queryKey: ['course', courseId],
    staleTime: Infinity,
    queryFn: () => {
      return courseId ? courseService.getCourse.bind(courseService)(courseId) : null;
    }
  });

  return {
    course: data ?? null,
    isLoading: isPending,
  }
}