import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('color-theme') === 'dark' || 
               (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        const nextTheme = !isDarkMode;
        setIsDarkMode(nextTheme);
        localStorage.setItem('color-theme', nextTheme ? 'dark' : 'light');
    };

    return (
        <nav className="border-b border-gray-100 dark:border-slate-800 py-6 px-8 lg:px-20 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            <div className="flex flex-col">
                <Link to="/" className="text-2xl tracking-tighter text-[#701c1c] dark:text-[#ff4d4d] font-black uppercase leading-none font-serif">
                    Baobab
                </Link>
                <span className="text-[10px] uppercase tracking-widest font-light text-gray-500 dark:text-slate-400">School of Computing</span>
            </div>

            <div className="flex items-center space-x-6 md:space-x-8">
                <div className="hidden md:flex space-x-6 text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-slate-300">
                    <Link to="/" className="hover:text-[#701c1c] transition">Campus</Link>
                    <Link to="/lab" className="hover:text-[#701c1c] transition">The Lab</Link>
                </div>

                <Link to="/dashboard" className="flex items-center space-x-3 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-tighter leading-none dark:text-white">Amos Omari</p>
                        <p className="text-[8px] text-[#701c1c] dark:text-[#ff4d4d] font-bold uppercase tracking-widest">Level 4</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center group-hover:border-[#701c1c] transition-all text-xs">
                        🌳
                    </div>
                </Link>

                <button onClick={toggleTheme} className="p-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800 transition-all text-sm">
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;