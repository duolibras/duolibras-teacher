import { ApiService } from "@/application/shared/services/api-service";
import { CreateCourseDTO, CreateCourseResponse, GetCoursePreviewResponse, GetCourseResponse, GetCoursesResponse } from "./dto/course-dto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface GetCoursesParams extends Record<string, any> {
  creator?: boolean;
  owned?: boolean;
  archived?: boolean;
}

export class CourseService extends ApiService {
  private readonly baseUrl: string

  constructor() {
    super();
    this.baseUrl = '/courses'
  }

  async getCourses(params?: GetCoursesParams) {
    const queryParams = params && new URLSearchParams(params);

    return this.httpClient.get<GetCoursesResponse>(`${this.baseUrl}?${queryParams}`);
  }

  async getCourse(courseId: string) {
    const { data } = await this.httpClient.get<GetCourseResponse>(`public${this.baseUrl}/${courseId}`);

    return data.course;
  }

  async getCoursePreview(courseId: string) {
    const { data } = await this.httpClient.get<GetCoursePreviewResponse>(`public${this.baseUrl}/${courseId}/preview`);

    return data.previewUrl;
  }

  async createCourse(dto: CreateCourseDTO) {
    return this.httpClient.post<CreateCourseResponse>(`${this.baseUrl}`, dto);
  }

  async deleteCourse(courseId: string) {
    return this.httpClient.delete<void>(`${this.baseUrl}/${courseId}`);
  }
}