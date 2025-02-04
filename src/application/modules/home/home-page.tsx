import { useEffect, useRef } from 'react';
import { Background } from './components/background';
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
    <div className="w-full flex items-center justify-center relative overflow-y-scroll flex-col scroll-smooth snap-y snap-mandatory overflow-x-hidden">
      <Header/>
      <section id='duolibras' className='max-w-screen-xl w-full mx-auto flex items-center justify-start h-screen relative snap-start'>
        <MainSection />
        <Background />
      </section>
      {/* <section id='como-estamos-agora' className='h-screen w-full max-w-screen-xl mx-auto flex justify-center items-center flex-col snap-start p-5'>
        <HowWeAre />
      </section> */}

      <Footer />
    </div>
  );
}