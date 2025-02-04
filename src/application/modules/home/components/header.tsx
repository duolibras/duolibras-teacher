import Logo from '@/application/assets/logo.svg';
import { Button } from "@/application/shared/components/ui/button";
import { NavLink } from "react-router";

export function Header() {
  return (
    <header className="w-full fixed left-0 top-0 shadow-md border-opacity-15 backdrop-blur-md z-50">
      <div className='max-w-screen-xl mx-auto flex p-4 w-full items-center justify-between '>
        <div className='flex items-center gap-12'>
          <img src={Logo} alt="DuoLibras" className='w-40' />
        </div>


        <div>
          <Button variant="link" asChild>
            <NavLink to="/sign-in">
              Área do professor
            </NavLink>
          </Button>
          <Button 
            variant="outline" 
            className='rounded-full hover:bg-muted text-primary hover:text-primary'
            asChild
          >
            <NavLink to="/sign-up">
              Quero criar conteúdo
            </NavLink>
          </Button>
        </div>
      </div>
    </header>
  );
}