import { AccountPaymentDetailsStatus } from '@/application/modules/account/service/dto/payment-details-dto';
import z from 'zod';

export const signUpDTO = z.object({
  name: z.string().min(2),
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string({ required_error: 'Senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
});

export type SignUpDTO = z.infer<typeof signUpDTO>;
export type SignUpResponse = void;

export const signInDTO = z.object({
  email: z.string().email({ message: 'E-mail inválido' }).min(1),
  password: z.string({ required_error: 'Senha é obrigatória' }).min(8, 'Senha deve ter mais que 8 caracteres'),
});

export enum Roles {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}

export type SignInDTO = z.infer<typeof signInDTO>;
export interface SignInResponse {
  accessToken: string;
  role: Roles
}

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Roles;
  createdAt: Date;
  updateAt: Date;
  paymentDetails: {
    hasPaymentDetails: boolean;
    status: AccountPaymentDetailsStatus | null;
};
}

export interface MeResponse {
  account: Account;
}