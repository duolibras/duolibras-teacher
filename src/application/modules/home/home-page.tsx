import { useEffect, useRef } from 'react';
import { Background } from './components/background';
import { Data } from './components/data';
import { Header } from './components/header';

import { Footer } from './components/footer';
import { MainSection } from './components/main-section';

export function Home() {
  const sectionsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    sectionsRef.current = sections;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            entry.target.scrollIntoView({ behavior: "smooth" });
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  
  return (
    <div className="w-full flex items-center justify-center relative overflow-y-scroll flex-col scroll-smooth snap-y snap-mandatory">
      <Header/>
      <section id='duolibras' className='max-w-screen-xl w-full mx-auto flex items-center justify-start h-screen relative snap-start'>
        <MainSection />
        <Background />
      </section>
      <section id='como-estamos-agora' className='h-screen w-full max-w-screen-xl mx-auto flex justify-center items-center flex-col snap-start'>
        <div className='w-full h-fit mt-32'>
          <h2 className='text-5xl font-bold tracking-wide mb-1'>Como estamos agora?</h2>
          <span className='text-muted-foreground'>Nossos dados em tempo real</span>
        </div>
        <div className='w-full h-full grid grid-cols-3'>
          <Data text='30+' description='Professores e intérpretes criando conteúdo' />          
          <Data text='500+' description='Alunos consumindo esse conteúdo' />          
          <Data text='1K+' description='Conteúdos interpretádos e acessíveis' type='secondary' />          
        </div>
      </section>

      <Footer />
    </div>
  );
}