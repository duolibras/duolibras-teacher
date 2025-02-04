import Logo from '@/application/assets/logo.svg';
import { Button } from '@/application/shared/components/ui/button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between p-4 mt-auto w-full border-t-[1px] border-solid border-primary">
      <div className="p-5 max-w-screen-xl mx-auto px-6 gap-8 w-full">
        <div className='grid md:grid-cols-2 grid-cols-1'>
          <div>
            <img src={Logo} alt="DuoLibras" className='w-40' />
            <p className="text-gray-400 mt-2">
              Criando pontes de comunicação entre mundos.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center border-t w-full border-gray-700 pt-5 text-gray-400 flex justify-between items-center">
          <span>
            © DuoLibras {new Date().getFullYear()}
          </span>

          <div className='flex items-center gap-2'>
            <Button variant='link' className='size-14' asChild>
              <Instagram />
            </Button>
            <Button variant='link' className='size-14' asChild>
              <Facebook />
            </Button>
            <Button variant='link' className='size-14' asChild>
              <Twitter />
            </Button>
          </div>
        </div>

      </div>
    </footer>
  )
}