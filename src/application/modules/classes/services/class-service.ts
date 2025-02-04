import { ApiService } from "@/application/shared/services/api-service";
import { CreateClassDTO, CreateClassResponse, GetClassesResponse } from "./dto/class-dto";

export class ClassService extends ApiService {
  private readonly baseUrl: string

  constructor() {
    super();
    this.baseUrl = '/classes'
  }

  async getClasses(courseId: string) {
    const { data } = await this.httpClient.get<GetClassesResponse>(`${this.baseUrl}/course/${courseId}`);

    return data.classes;
  }

  async createClass(dto: CreateClassDTO) {
    return await this.httpClient.post<CreateClassResponse>(`${this.baseUrl}`, dto);
  }
}