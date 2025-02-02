import { CourseService } from "./course-service";

export function makeCourseService() {
  return new CourseService();
}