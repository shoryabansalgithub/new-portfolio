import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import NowBuilding from './components/NowBuilding';
import GithubActivity from './components/GithubActivity';
import AcademicRecords from './components/AcademicRecords';
import Stamp from './components/Stamp';
import { SunIcon, MoonIcon } from './components/Icons';
import { BIO } from './constants';

function App() {
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen w-full flex justify-center transition-colors duration-300 ${darkMode ? 'bg-paper-dark text-zinc-200 selection:bg-zinc-800' : 'bg-paper text-zinc-800 selection:bg-zinc-300 selection:text-black'}`}>
      
      <div className={`w-full max-w-[900px] border-x min-h-screen relative z-10 flex flex-col transition-colors duration-300 ${darkMode ? 'border-zinc-800 bg-paper-dark' : 'border-zinc-300 bg-paper'}`}>
        
        {/* MASTHEAD */}
        <header className={`pt-16 pb-0 flex flex-col items-center gap-4 text-center relative border-b-2 ${darkMode ? 'border-zinc-800' : 'border-zinc-800'}`}>
          
          <button 
            onClick={toggleTheme}
            className={`absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full border transition-colors z-20 ${darkMode ? 'border-zinc-800 text-zinc-400 hover:text-white' : 'border-zinc-400 text-zinc-600 hover:text-black hover:border-black'}`}
            aria-label="Toggle Theme"
          >
            {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          {/* Vol / Date Bar - Full Width Border */}
          <div className={`w-full border-b pb-2 mb-2 px-6 sm:px-8 flex justify-between items-center text-[9px] sm:text-[10px] font-mono uppercase tracking-widest ${darkMode ? 'text-zinc-500 border-zinc-800' : 'text-zinc-600 border-zinc-400'}`}>
             <span>Vol. 01</span>
             <span className="hidden sm:inline">{darkMode ? 'Dark Edition' : 'Print Edition'}</span>
             <span>{currentDate}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-8 px-4 w-full max-w-4xl">
            <h1 className={`text-5xl sm:text-7xl md:text-8xl font-serif font-bold tracking-tighter uppercase scale-y-125 sm:scale-y-110 leading-none ${darkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
              <span>{BIO.firstName}</span><span className="inline-block w-6 sm:w-8"></span><span>{BIO.lastName}</span>
            </h1>
            <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <Stamp />
            </div>
          </div>
        </header>

        {/* MAIN LAYOUT - SPLIT INTO ROWS FOR ALIGNMENT */}
        <div className="flex flex-col">
          
          {/* ROW 1: Intro & Sidebar Top */}
          <div className={`flex flex-col md:grid md:grid-cols-12 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
             {/* Hero Section */}
             <div className="md:col-span-8 p-6 sm:p-8">
                <Hero />
             </div>
             
             {/* Sidebar Top */}
             <div className={`md:col-span-4 border-t md:border-t-0 md:border-l-2 md:border-dotted flex flex-col ${darkMode ? 'border-zinc-800 bg-zinc-900/10' : 'border-zinc-300 bg-transparent'}`}>
                <div className={`p-6 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
                    <h3 className={`font-mono text-xs uppercase tracking-wider mb-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Now Building</h3>
                    <NowBuilding />
                </div>

                <div className="py-6 h-full">
                   <TechStack />
                </div>
             </div>
          </div>

          {/* ROW 2: Projects & Sidebar Bottom - ALIGNED START */}
          <div className="flex flex-col md:grid md:grid-cols-12">
             
             {/* Projects & Activity */}
             <div className="md:col-span-8">
                <div className={`p-6 sm:p-8 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
                   <Projects onViewAll={() => setCurrentPage('projects')} />
                </div>
                <div className="p-6 sm:p-8">
                   <GithubActivity />
                </div>
             </div>
             
             {/* Sidebar Bottom */}
             <div className={`md:col-span-4 border-t md:border-t-0 md:border-l-2 md:border-dotted flex flex-col ${darkMode ? 'border-zinc-800 bg-zinc-900/10' : 'border-zinc-300 bg-transparent'}`}>
                 <div className={`py-6 sm:py-8 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-300'}`}>
                    <Experience />
                 </div>
                 <div className="py-6 sm:py-8">
                    <AcademicRecords />
                 </div>
             </div>

          </div>

        </div>

        {/* FOOTER */}
        <footer className={`border-t-2 p-8 text-center flex flex-col items-center gap-2 ${darkMode ? 'border-zinc-800' : 'border-zinc-800'}`}>
             <div className={`font-serif italic text-2xl ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`}>The End &bull; Vol. 01</div>
            <p className={`font-mono text-[9px] uppercase ${darkMode ? 'text-zinc-700' : 'text-zinc-500'}`}>
                Printed in the digital realm | Made with &hearts; by {BIO.name.split(' ')[0]}
            </p>
            <p className={`font-mono text-[9px] uppercase mt-2 ${darkMode ? 'text-zinc-800' : 'text-zinc-400'}`}>
                &copy; 2025 All Rights Reserved
            </p>
        </footer>

      </div>
    </div>
  );
}

export default App;