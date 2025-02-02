import Logo from '@/application/assets/logo.svg';
import { Button } from "@/application/shared/components/ui/button";
import { Link } from "react-router";

interface IChildren {
  children: React.ReactNode;
}

interface IProps extends IChildren {
  title: string;
}

export function FormContainer({ children, title }: IProps) {
  return (
    <div className="w-full">
      <div className="max-w-[440px] mx-auto w-full flex items-center flex-col">
        <div className='mb-10'>
          <img src={Logo} alt="Logo" className='h-10' />
        </div>

        <FormTitle>{title}</FormTitle>

        {children}
      </div>
    </div>
  )
}


interface IFormWrapperProps extends React.FormHTMLAttributes<HTMLFormElement> {
  buttonLabel: string;
  disabled: boolean
}

function FormWrapper({ children, buttonLabel, disabled, ...props }: IFormWrapperProps) {
  return (
    <form className="w-full space-y-8 mt-12" {...props}>
      <div className="space-y-4">
        {children}
      </div>

      <Button type="submit" disabled={disabled} className="w-full">{buttonLabel}</Button>
    </form>
  )
}

function FormTitle({ children }: IChildren) {
  return <h1 className="text-2xl tracking-tight font-bold mb-4" >{children}</h1>
}

interface IFormSubtitle  {
  text: string;
  span: string;
  to: string;
}

function FormSubtitle({ span, text, to }: IFormSubtitle) {
  return (
    <h2 className=" text-base tracking-tighter gap-2 flex" >
      {text}
      <Link className="text-primary" to={to}>{span}</Link>
    </h2>
  )
}

export const Form = {
  Container: FormContainer,
  Wrapper: FormWrapper,
  Title: FormTitle,
  Subtitle: FormSubtitle,
}