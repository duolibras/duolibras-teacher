import { Input } from "@/application/shared/components/ui/input";
import { Label } from "@/application/shared/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../../components/form";
import { useSignUp } from "../../hooks/use-sign-up";
import { signUpDTO, SignUpDTO } from "../../services/dto/account-dto";

export function SignUp() {
  const { signUp } = useSignUp();
  const { register, handleSubmit: onSubmit, formState: { errors, isValid, isSubmitted } } = 
    useForm<SignUpDTO>({resolver: zodResolver(signUpDTO)});

  const handleSubmit: SubmitHandler<SignUpDTO> = async (signUpDTO) => {
    signUp(signUpDTO)
  };

  return (
    <Form.Container title="Crie sua conta">
      <Form.Subtitle 
        text="Já possui uma conta?"
        span="Fazer login"
        to="/sign-in"
      />

      <Form.Wrapper disabled={!isValid && isSubmitted} onSubmit={onSubmit(handleSubmit)} buttonLabel="Criar conta">
        <div className="space-y-2">
          <Label>Nome</Label>
          <Input {...register('name')} />
          {errors.name && (
            <span className="flex w-full items-end justify-end text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="space-y-2">
          <Label>E-mail</Label>
          <Input {...register('email')} />
          {errors.email && (
            <span className="flex w-full items-end justify-end text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="space-y-2" >
          <Label>Senha</Label>
          <Input {...register('password')} />
          {errors.password && (
            <span className="flex w-full items-end justify-end text-red-500">{errors.password.message}</span>
          )}
        </div>
      </Form.Wrapper>
    </Form.Container>
  );
}