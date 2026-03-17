import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore'; // Use the global store
import { LogOut, Sun, Moon } from 'lucide-react'; // Clean icons

const Navbar = () => {
    // 1. Pull the real authenticated user from the store
    const { user, logout, isAuthenticated } = useAuthStore((state) => state);
    
    // 2. State for Dark Mode
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

    // If not logged in, we only show the Logo and a Login link
    if (!isAuthenticated) {
        return (
            <nav className="border-b border-gray-100 dark:border-slate-800 py-6 px-8 lg:px-20 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <Link to="/" className="text-2xl tracking-tighter text-[#701c1c] dark:text-[#ff4d4d] font-black uppercase leading-none font-serif">
                    Baobab
                </Link>
                <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-slate-300 hover:text-[#701c1c]">
                    Initialize Session
                </Link>
            </nav>
        );
    }

    return (
        <nav className="border-b border-gray-100 dark:border-slate-800 py-6 px-8 lg:px-20 flex justify-between items-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
            
            <div className="flex flex-col">
                <Link to="/" className="text-2xl tracking-tighter text-[#701c1c] dark:text-[#ff4d4d] font-black uppercase leading-none font-serif">
                    Baobab
                </Link>
                <span className="text-[10px] uppercase tracking-widest font-light text-gray-500 dark:text-slate-400">
                    School of Computing
                </span>
            </div>

            <div className="flex items-center space-x-6 md:space-x-8">
                <div className="hidden md:flex space-x-6 text-[11px] font-bold uppercase tracking-widest text-gray-600 dark:text-slate-300">
                    <Link to="/" className="hover:text-[#701c1c] dark:hover:text-[#ff4d4d] transition">Campus</Link>
                    <Link to="/lab" className="hover:text-[#701c1c] dark:hover:text-[#ff4d4d] transition">The Lab</Link>
                </div>

                {/* Profile Section - Uses dynamic data from Auth Store */}
                <Link to={`/dashboard/${user?.id}`} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-[9px] font-black uppercase tracking-tighter leading-none dark:text-white">
                            {user?.name || "Neural Node"}
                        </p>
                        <p className="text-[8px] text-[#701c1c] dark:text-[#ff4d4d] font-bold uppercase tracking-widest">
                            Level {user?.level || 1}
                        </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 flex items-center justify-center group-hover:border-[#701c1c] dark:group-hover:border-[#ff4d4d] transition-all text-xs">
                        🌳
                    </div>
                </Link>

                {/* Utility Actions */}
                <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-slate-800 pl-6">
                    <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-[#701c1c] transition-all">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button onClick={logout} className="p-2 text-gray-400 hover:text-red-600 transition-all" title="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;