import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Roles, SignInDTO, SignInResponse } from "../services/dto/account-dto";
import { makeAuthService } from "../services/make-auth-service";

export function useSignIn() {
  const authService = makeAuthService();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<SignInResponse>, Error, SignInDTO>({
    mutationFn: authService.signIn.bind(authService),
    onSuccess: (response) => {
      const { accessToken, role } = response.data;
      authService.setToken({accessToken, role});

      if (role !== Roles.TEACHER) {
        return toast.error('Essa é a área para professores, se quiser entrar como aluno você pode acessar nosso aplicativo!');
      }

      navigate('/dashboard');
    },
    onError: () => {
      toast.error('Credenciais inválidas');
    }
  });

  return {
    signIn: mutateAsync,
    isLoading: isPending,
  }
}