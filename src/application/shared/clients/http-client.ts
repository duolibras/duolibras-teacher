import { makeAuthService } from '@/application/modules/auth/services/make-auth-service';
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_KEY_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const authService = makeAuthService();

    const { accessToken } = authService.getToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
