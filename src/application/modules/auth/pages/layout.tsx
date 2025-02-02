import Duolibras from '@/application/assets/duolibras.png';
import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="h-screen w-full flex justify-between items-center ">
      <Outlet />

      <div className="w-full h-screen flex justify-center flex-col items-center bg-gradient-to-br to-cyan-700 from-cyan-500">
        <img src={Duolibras} alt="Logo do duolibras" className='size-96' />
        
        <span className='text-4xl text-gray-300'>
          duo
          <strong>Libras</strong>
        </span>
      </div>
    </div>
  );
}