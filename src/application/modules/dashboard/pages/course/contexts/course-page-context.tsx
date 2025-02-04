import { createContext, useContext } from "react";
import { SummaryCourse } from "../../../services/dto/course-dto";

interface ICoursePageContextParams {
  course: SummaryCourse;
}

const CoursePageContext = createContext<ICoursePageContextParams | null>(null);

export function useCoursePageContext() {
  const context = useContext(CoursePageContext);
  if (!context) throw new Error('useCoursePageContext should only be used inside a CoursePageProvider');
  return context;
}

interface IProps {
  course: SummaryCourse;
  children: React.ReactNode;
}

export function CoursePageProvider({ children, course }: IProps) {
  return (
    <CoursePageContext.Provider value={{ course }}>
      {children}
    </CoursePageContext.Provider>
  )
}