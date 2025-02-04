import { useQuery } from "@tanstack/react-query";
import { makeAccountService } from "../service/make-account-service";

export function useGetPaymentDetails() {
  const accountService = makeAccountService();

  const { data, isPending } = useQuery({
    queryKey: ['payment-details'],
    queryFn: accountService.getPaymentDetails.bind(accountService)
  });

  return {
    loginUrl: data?.data.loginUrl,
    isLoading: isPending,
  }
}