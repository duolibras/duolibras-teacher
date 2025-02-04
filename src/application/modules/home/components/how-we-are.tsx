import { Data } from "./data";

export function HowWeAre() {
  return (
    <div>
      <div className='w-full h-fit mt-32'>
      <h2 className='text-5xl font-bold tracking-wide mb-1'>Como estamos agora?</h2>
      <span className='text-muted-foreground'>Nossos dados em tempo real</span>
      </div>
      <div className='w-full h-full grid grid-cols-3'>
        <Data text='30+' description='Professores e intérpretes criando conteúdo' />          
        <Data text='500+' description='Alunos consumindo esse conteúdo' />          
        <Data text='1K+' description='Conteúdos interpretádos e acessíveis' type='secondary' />          
      </div>
    </div>
  );
}