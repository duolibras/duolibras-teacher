import { useQueryClient } from "@tanstack/react-query";
import { SummaryCourse } from "../services/dto/course-dto";

interface IProps { course: SummaryCourse };

export function useSetCourse() {
  const queryClient = useQueryClient();

  function setCourse({ course }: IProps) {
    queryClient.setQueryData<SummaryCourse>(
      ['course', course.id], 
      course,
    );
  }

  return {
    setCourse,
  }
}