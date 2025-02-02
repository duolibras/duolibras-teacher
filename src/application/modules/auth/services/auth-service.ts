import { ApiService } from "@/application/shared/services/api-service";
import { MeResponse, Roles, SignInDTO, SignInResponse, SignUpDTO, SignUpResponse } from "./dto/account-dto";

export class AuthService extends ApiService {
  private readonly baseUrl: string

  constructor() {
    super();
    this.baseUrl = '/auth'
  }

  async me() {
    return this.httpClient.get<MeResponse>(`${this.baseUrl}/me`);
  }

  async signIn(dto: SignInDTO) {
    return this.httpClient.post<SignInResponse>(`${this.baseUrl}/sign-in`, dto);
  }

  async signUpTeacher(dto: SignUpDTO) {
    return this.httpClient.post<SignUpResponse>(`${this.baseUrl}/sign-up/teacher`, dto);
  }

  async signUpStudent(dto: SignUpDTO) {
    return this.httpClient.post<SignUpResponse>(`${this.baseUrl}/sign-up/student`, dto);
  }

  logout() {
    localStorage.removeItem('@duolibras:access-token');
    localStorage.removeItem('@duolibras:role');
  }

  setToken({ accessToken, role }: SignInResponse) {
    localStorage.setItem('@duolibras:access-token', accessToken);
    localStorage.setItem('@duolibras:role', role);
  }

  getToken() {
    const accessToken = localStorage.getItem('@duolibras:access-token');
    const role = localStorage.getItem('@duolibras:role') as Roles | null;

    return {
      accessToken,
      role
    }
  }
}