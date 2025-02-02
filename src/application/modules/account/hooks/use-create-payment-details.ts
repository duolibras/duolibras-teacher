import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { CreatePaymentDetailsDTO, CreatePaymentDetailsResponse } from "../service/dto/payment-details-dto";
import { makeAccountService } from "../service/make-account-service";

export function useCreatePaymentDetails() {
  const accountService = makeAccountService();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<CreatePaymentDetailsResponse>, Error, CreatePaymentDetailsDTO>({
    mutationFn: accountService.createPaymentDetails.bind(accountService),
    onSuccess: ({ data }) => {
      if (data.accountPaymentDetails.onboardingUrl) {
        window.location.href = data.accountPaymentDetails.onboardingUrl;
      } else {
        toast.error('Ocorreu um erro ao gerar seu link para cadastro de dados de pagamento');
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const message = err.response?.data.message;
        toast.error(message);
      } else {
        toast.error('Ocorreu um erro ao gerar seu link para cadastro de dados de pagamento');
      }
    }
  });

  return {
    createPaymentDetails: mutateAsync,
    isLoading: isPending,
  }
}