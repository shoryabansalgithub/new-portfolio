import React from 'react';
import { BIO, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-[1.1] mb-6 uppercase tracking-tight transition-colors duration-300 text-zinc-900 dark:text-zinc-100">
                {BIO.headline}
            </h2>
             <p className="text-sm sm:text-base leading-relaxed font-sans text-justify transition-colors duration-300 text-zinc-700 dark:text-zinc-400">
                {BIO.description}
            </p>
            
            <div className="flex gap-4 mt-8">
                <a href="#" className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-xs font-bold uppercase tracking-wide hover:opacity-80 transition-opacity">
                    Read Resume
                </a>
                <a href="#" className="border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-300 border-zinc-400 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white">
                    Contact
                </a>
            </div>
        </div>
        
        <div className="w-full sm:w-48 shrink-0 flex flex-col gap-4">
             <div className="relative border p-1 rotate-1 hover:rotate-0 transition-all duration-500 border-zinc-400 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
                <img 
                    src="https://wsrv.nl/?url=i.pinimg.com/originals/8f/33/7f/8f337f7114227094406201735076326c.jpg" 
                    alt="Sniper Mask Profile" 
                    className="w-full h-auto aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
             </div>
             <p className="font-mono text-[9px] text-center uppercase border-b pb-2 transition-colors duration-300 text-zinc-500 border-zinc-300 dark:text-zinc-600 dark:border-zinc-800">
                 Fig A. The Developer
             </p>

             <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] uppercase transition-colors duration-300 text-zinc-500">Connect</span>
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-mono uppercase transition-colors group text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    <link.icon className="w-3 h-3 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                    <span>{link.name}</span>
                  </a>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;