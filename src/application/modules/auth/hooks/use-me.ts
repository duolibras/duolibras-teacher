import { useQuery } from "@tanstack/react-query";
import { Account } from "../services/dto/account-dto";
import { makeAuthService } from "../services/make-auth-service";

export function useMe() {
  const authService = makeAuthService();

  const { data, isPending } = useQuery({
    queryKey: ['me'],
    staleTime: 30,
    queryFn: authService.me.bind(authService),
    refetchOnWindowFocus: true,
  });

  return {
    profile: data?.data.account ?? {} as Account,
    isLoading: isPending,
  }
}