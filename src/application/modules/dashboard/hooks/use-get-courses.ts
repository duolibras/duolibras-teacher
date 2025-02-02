import { useQuery } from "@tanstack/react-query";
import { GetCoursesParams } from "../services/course-service";
import { makeCourseService } from "../services/make-course-service";

export function useGetCourses(params?: GetCoursesParams) {
  const courseService = makeCourseService();

  const { data, isPending } = useQuery({
    queryKey: ['courses', params],
    staleTime: Infinity,
    queryFn: () => courseService.getCourses.bind(courseService)(params),
  });

  return {
    courses: data?.data.courses ?? [],
    isLoading: isPending,
  }
}