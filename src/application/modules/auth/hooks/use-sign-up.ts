import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { SignUpDTO, SignUpResponse } from "../services/dto/account-dto";
import { makeAuthService } from "../services/make-auth-service";

export function useSignUp() {
  const authService = makeAuthService();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<SignUpResponse>, Error, SignUpDTO>({
    mutationFn: authService.signUpTeacher.bind(authService),
    onSuccess: () => {
      toast.success('Conta criada com sucesso, por fazer faça login!');

      navigate('/sign-in')
    },
    onError: () => {
      toast.error('Ocorreu um erro ao criar sua conta');
    }
  });

  return {
    signUp: mutateAsync,
    isLoading: isPending,
  }
}