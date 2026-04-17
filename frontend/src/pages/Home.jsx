import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedPage from '../Components/AnimatedPage.jsx';
import useAuthStore from '../Store/useAuthStore.js'; 

const Home = () => {
    const { theme } = useAuthStore((state) => state);
    const navigate = useNavigate();
    const demoStudentId = "amos-01";

    // --- THEME ENGINE ---
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }, [theme]);

    return (
        <AnimatedPage>
            <div className="relative bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-500 min-h-screen font-sans overflow-hidden">
                
                {/* --- THE GRAIN OVERLAY --- */}
                <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.06]" 
                     style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />

                <div className="relative z-10">
                    {/* Hero Header */}
                    <header className="max-w-6xl mx-auto px-8 lg:px-20 py-24">
                        <div className="max-w-3xl">
                            <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-gray-400 dark:text-slate-500 mb-4">Nairobi, Kenya</p>
                            <h2 className="text-5xl md:text-7xl mb-8 leading-[1.1] tracking-tight dark:text-white font-serif font-black">
                                Engineering the future of the <span className="italic opacity-70 text-slate-500 dark:text-slate-400">Silicon Savannah.</span>
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-slate-400 font-normal mb-10 leading-relaxed">
                                An elite online code lab. We offer a rigorous foundation in software architecture, low-level systems, and automated workflows.
                            </p>
                            <div className="flex items-center space-x-6">
                                <a href="#departments" className="bg-[#701c1c] text-white px-8 py-4 font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-black transition-all">
                                    Start Learning
                                </a>
                                <button className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-slate-400 border-b border-transparent hover:border-gray-400 transition">
                                    View Curriculum
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Progress Bar Mission Card */}
                    <section className="max-w-6xl mx-auto px-8 lg:px-20 -mt-10 relative z-10">
                        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-xl bg-[#701c1c] flex items-center justify-center text-xl shadow-lg">🚀</div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400">Active Module</p>
                                    <h4 className="font-bold dark:text-white">C-01: Memory & Pointers</h4>
                                </div>
                            </div>

                            <div className="flex-1 max-w-xs w-full">
                                <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
                                    <span>Module Completion</span>
                                    <span>65%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#701c1c]" style={{ width: '65%' }}></div>
                                </div>
                            </div>

                            <Link to="/course/systems-c" className="text-[10px] text-center font-black uppercase tracking-widest bg-gray-900 dark:bg-white dark:text-black text-white px-6 py-3 rounded-lg hover:scale-105 transition">
                                Open Course Editor
                            </Link>
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
                                    target="/course/frontend-arch"
                                    onClick={() => navigate('/course/frontend-arch')}
                                />
                                <DepartmentCard
                                    title="Systems Programming"
                                    desc="Mastering memory management and hardware logic via ANSI C."
                                    accent="bg-black dark:bg-white"
                                    target="/course/systems-c"
                                    onClick={() => navigate('/course/systems-c')}
                                />
                                <DepartmentCard
                                    title="Applied Scripting"
                                    desc="Automating complex workflows with Python and Unix Bash."
                                    accent="bg-gray-300 dark:bg-slate-600"
                                    target="/course/python-automation"
                                    onClick={() => navigate('/course/python-automation')}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 pt-20 pb-20 px-8 lg:px-20">
                        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                            <p>© 2026 Baobab School of Computing | Nairobi, KE</p>
                            <p className="italic font-serif text-sm mt-4 md:mt-0 font-normal normal-case opacity-60">veritas via codice</p>
                        </div>
                    </footer>
                </div>

                {/* --- TERMINAL STATUS BAR --- */}
                <div className="fixed bottom-0 left-0 right-0 h-8 bg-black border-t border-slate-800 z-[100] flex items-center justify-between px-4 font-mono text-[9px] text-green-500/80 tracking-tighter">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                            CORE_STABLE
                        </span>
                        <span className="text-slate-600">|</span>
                        <span>NGONG_HUB_NODE_CONNECTED</span>
                    </div>
                    <div className="hidden sm:block text-slate-500 uppercase">
                        VFS_MOUNT_SUCCESS // Path: /home/amos/courses/
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

const DepartmentCard = ({ title, desc, accent, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white dark:bg-slate-800 p-10 border border-gray-200 dark:border-slate-700 hover:shadow-2xl transition-all group cursor-pointer"
    >
        <div className={`w-10 h-1 ${accent} mb-6 group-hover:w-full transition-all duration-500`}></div>
        <h4 className="text-2xl mb-4 font-bold dark:text-white font-serif">{title}</h4>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-8 font-normal leading-relaxed">{desc}</p>
        <span className="text-[10px] font-bold uppercase tracking-widest border-b border-current pb-1 group-hover:text-[#701c1c] transition">
            Start Course Module &rarr;
        </span>
    </div>
);

export default Home;