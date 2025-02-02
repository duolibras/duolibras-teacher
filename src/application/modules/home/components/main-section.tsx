import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const words = ["Diversidade", "Inclusão", "Comunicação"];

export function MainSection() {
  const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev) === (words.length - 1) ? 0 : prev + 1);
      }, 3000); 
  
      return () => clearInterval(interval);
    }, []);
  

  return (
    <main className='w-fit max-w-xl flex z-10 px-5'>
      <div className='mx-auto max-w-xl w-fit flex flex-col'>
        <div className='p-1.5 z-50 backdrop-blur-3xl outline-primary bg-muted-gradient rounded-full w-fit'>
          <div className='dark:bg-slate-950 bg-slate-50 dark:bg-opacity-40 rounded-full'>
            <span className='text-gradient uppercase font-bold p-2 text-sm tracking-wide'>
              Muito mais que uma plataforma 🐬
            </span>
          </div>
        </div>

        <div className='justify-start relative pb-16'>
          <h1 className='text-6xl font-bold tracking-wide mt-4 '>
            Criamos pontes de comunicação entre mundos! 🐬
          </h1>

          <AnimatePresence mode='popLayout'>
            <motion.span 
              key={words[index]}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "0%", opacity: 0 }}
              transition={{ duration: 0.5, ease: "backOut" }}
              className="absolute text-gradient text-6xl font-bold tracking-wide leading-tight"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className='mt-10'>
          <h2 className='text-muted-foreground font-thin tracking-wider text-2xl'>
            A melhor e mais completa plataforma para ensino inclusivo.
          </h2>
        </div>
      </div>
    </main>
  );
}