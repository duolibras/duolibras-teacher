import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { UpdatePaymentDetailsDTO, UpdatePaymentDetailsResponse } from "../service/dto/payment-details-dto";
import { makeAccountService } from "../service/make-account-service";

export function useUpdatePaymentDetails() {
  const accountService = makeAccountService();

  const { mutateAsync, isPending } = useMutation<AxiosResponse<UpdatePaymentDetailsResponse>, Error, UpdatePaymentDetailsDTO>({
    mutationFn: accountService.updatePaymentDetails.bind(accountService),
    onSuccess: ({ data }) => {
      if (data.updatePaymentDetailsUrl) {
        window.location.href = data.updatePaymentDetailsUrl;
      } else {
        toast.error('Ocorreu um erro ao gerar seu link para atualizar seus dados de pagamento');
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        const message = err.response?.data.message;
        toast.error(message);
      } else {
        toast.error('Ocorreu um erro ao gerar seu link para atualizar seus dados de pagamento');
      }
    }
  });

  return {
    updatePaymentDetails: mutateAsync,
    isLoading: isPending,
  }
}