import { z } from "zod";

export const createPaymentDetailsDTO = z.object({
  returnUrl: z.string().url(),
});

export type CreatePaymentDetailsDTO = z.infer<typeof createPaymentDetailsDTO>;
export type UpdatePaymentDetailsDTO = CreatePaymentDetailsDTO;

export enum AccountPaymentDetailsStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface PaymentDetails {
  id: string;
  accountId: string;
  stripeAccountId: string;
  status: AccountPaymentDetailsStatus;
  onboardingUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePaymentDetailsResponse {
  accountPaymentDetails: PaymentDetails;
}

export interface UpdatePaymentDetailsResponse {
  updatePaymentDetailsUrl: string;
}

export interface GetPaymentDetailsResponse {
  loginUrl: string;
}