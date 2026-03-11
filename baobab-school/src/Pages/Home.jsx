import React, { useState, useEffect } from 'react';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme Toggle Logic
  useEffect(() => {
    if (localStorage.getItem('color-theme') === 'dark' || 
       (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-300 min-h-screen font-sans">
      
      {/* Navigation */}
      <nav className="border-b border-gray-100 dark:border-slate-800 py-6 px-8 lg:px-20 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col">
          <a href="/" className="text-2xl tracking-tighter text-[#701c1c] dark:text-[#ff4d4d] font-black uppercase leading-none font-serif">Baobab</a>
          <span className="text-[10px] uppercase tracking-widest font-light text-gray-500 dark:text-slate-400">School of Computing</span>
        </div>

        <div className="flex items-center space-x-6 md:space-x-8">
          <div className="hidden md:flex space-x-6 text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-slate-300">
            <a href="#" className="hover:text-[#701c1c] transition">Campus</a>
          </div>
          
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-tighter leading-none dark:text-white">Amos Omari</p>
              <p className="text-[8px] text-[#701c1c] dark:text-[#ff4d4d] font-bold uppercase tracking-widest">Level 4</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center group-hover:border-[#701c1c] transition-all">
              <span className="text-xs">🌳</span>
            </div>
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 transition-all text-sm">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="max-w-6xl mx-auto px-8 lg:px-20 py-24">
        <div className="max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-gray-400 dark:text-slate-500 mb-4">Nairobi, Kenya</p>
          <h2 className="text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tight dark:text-white font-serif font-black">
            Engineering the future of the <span className="italic opacity-70">Silicon Savannah.</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 font-normal mb-10 leading-relaxed">
            An elite online code lab. We offer a rigorous foundation in software architecture, low-level systems, and automated workflows.
          </p>
          <div className="flex items-center space-x-6">
            <button className="bg-[#701c1c] text-white px-8 py-4 font-bold text-xs uppercase tracking-widest shadow-lg hover:opacity-90 transition">Explore Tracks</button>
            <button className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-400 border-b border-transparent hover:border-gray-400 transition">Speak to an Advisor</button>
          </div>
        </div>
      </header>

      {/* Progress Bar Mission Card */}
      <section className="max-w-6xl mx-auto px-8 lg:px-20 -mt-10 relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#701c1c] flex items-center justify-center text-xl shadow-lg">🚀</div>
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400">Current Mission</p>
              <h4 className="font-bold dark:text-white">Track II: Pointer Arithmetic Lab</h4>
            </div>
          </div>

          <div className="flex-1 max-w-xs w-full">
            <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
              <span>Sprint Progress</span>
              <span>65%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[#701c1c]" style={{ width: '65%' }}></div>
            </div>
          </div>

          <button className="text-[10px] font-black uppercase tracking-widest bg-gray-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-lg hover:scale-105 transition">
            Go to My Dashboard
          </button>
        </div>
      </section>

      {/* Department Grid */}
      <section id="departments" className="py-24 px-8 lg:px-20 bg-gray-50 dark:bg-slate-900/50 border-y border-gray-100 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 mb-16">Academic Departments</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <DepartmentCard 
              title="Front-End Architecture" 
              desc="Designing performant, user-centric visual systems for the modern web."
              accent="bg-[#701c1c]"
            />
            <DepartmentCard 
              title="Systems Programming" 
              desc="Mastering memory management and hardware logic via ANSI C."
              accent="bg-black dark:bg-white"
            />
            <DepartmentCard 
              title="Applied Scripting" 
              desc="Automating complex workflows with Python and Unix Bash."
              accent="bg-gray-300 dark:bg-slate-600"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-20 pb-10 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">
          <p>© 2026 Baobab School of Computing | Nairobi, KE</p>
          <p className="italic font-serif text-sm mt-4 md:mt-0 font-normal normal-case opacity-60">veritas via codice</p>
        </div>
      </footer>
    </div>
  );
};

const DepartmentCard = ({ title, desc, accent }) => (
  <div className="bg-white dark:bg-slate-800 p-10 border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all group cursor-pointer">
    <div className={`w-10 h-1 ${accent} mb-6 group-hover:w-full transition-all duration-500`}></div>
    <h4 className="text-2xl mb-4 font-bold dark:text-white font-serif">{title}</h4>
    <p className="text-gray-600 dark:text-slate-400 text-sm mb-8 font-normal leading-relaxed">{desc}</p>
    <span className="text-[10px] font-bold uppercase tracking-widest border-b border-current pb-1 hover:opacity-70 transition">Explore Syllabus &rarr;</span>
  </div>
);

export default Home;