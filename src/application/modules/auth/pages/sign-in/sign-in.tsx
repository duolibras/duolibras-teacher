import { Input } from "@/application/shared/components/ui/input";
import { Label } from "@/application/shared/components/ui/label";
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from "../../components/form";
import { useSignIn } from "../../hooks/use-sign-in";
import { signInDTO, SignInDTO } from "../../services/dto/account-dto";

export function SignIn() {
  const { signIn } = useSignIn();
  const { register, handleSubmit: onSubmit, formState: { errors, isValid, isSubmitted } } = 
    useForm<SignInDTO>({resolver: zodResolver(signInDTO)});

  const handleSubmit: SubmitHandler<SignInDTO> = async (signInDTO) => {
    console.log('oi?')
    signIn(signInDTO)
  };

  return (
    <Form.Container title="Entre em sua conta">
      <Form.Subtitle 
        text="Novo por aqui?"
        span="Crie uma conta"
        to="/sign-up"
      />

      <Form.Wrapper disabled={!isValid && isSubmitted} onSubmit={onSubmit(handleSubmit)} buttonLabel="Entrar">
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