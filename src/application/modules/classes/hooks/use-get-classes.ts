import { useQuery } from "@tanstack/react-query";
import { makeClassService } from "../services/make-class-service";

interface IProps {
  courseId?: string
}

export const GET_CLASSES_QUERY_KEY = (courseId?: string) => ['classes', courseId];

export function useGetClasses({ courseId }: IProps) {
  const classService = makeClassService();

  const { data, isPending } = useQuery({
    queryKey: GET_CLASSES_QUERY_KEY(courseId),
    staleTime: Infinity,
    queryFn: () => courseId ? classService.getClasses.bind(classService)(courseId) : []
  });

  return {
    classes: data ?? [],
    isLoading: isPending,
  };
}