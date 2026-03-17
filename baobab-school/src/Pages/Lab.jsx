import React, { useState } from 'react';
import AnimatedPage from '../Components/AnimatedPage.jsx';
import { Terminal, Play, Save, Settings, ChevronRight, Cpu, Layers, HardDrive } from 'lucide-react';

const Lab = () => {
    const [activeFile, setActiveFile] = useState('main.c');
    const [terminalOutput, setTerminalOutput] = useState([
        "Baobab OS v2.4.0 [Stable]",
        "Initializing Compiler Environment...",
        "Ready."
    ]);

    const runCode = () => {
        setTerminalOutput(prev => [...prev, `> gcc ${activeFile} -o out`, "> ./out", "Hello, Silicon Savannah. System active."]);
    };

    return (
        <AnimatedPage>
            <div className="flex h-screen bg-slate-950 text-slate-300 font-mono overflow-hidden">
                
                {/* 1. Left Sidebar: System Navigation */}
                <aside className="w-16 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                    <div className="p-4 border-b border-slate-800 flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-slate-500">Node: Lab-01</span>
                    </div>
                    
                    <nav className="flex-1 p-2 space-y-1">
                        <FileItem name="main.c" active={activeFile === 'main.c'} onClick={() => setActiveFile('main.c')} />
                        <FileItem name="header.h" active={activeFile === 'header.h'} onClick={() => setActiveFile('header.h')} />
                        <FileItem name="utils.c" active={activeFile === 'utils.c'} onClick={() => setActiveFile('utils.c')} />
                    </nav>

                    <div className="p-4 border-t border-slate-800 space-y-4 hidden md:block">
                        <SystemStat icon={<Cpu size={14}/>} label="CPU" value="12%" />
                        <SystemStat icon={<Layers size={14}/>} label="MEM" value="256MB" />
                    </div>
                </aside>

                {/* 2. Main Editor Area */}
                <main className="flex-1 flex flex-col">
                    {/* Toolbar */}
                    <div className="h-12 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-6">
                        <div className="flex items-center gap-2 text-[11px] font-bold">
                            <span className="text-slate-500">projects / baobab /</span>
                            <span className="text-white">{activeFile}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button onClick={runCode} className="flex items-center gap-2 px-3 py-1 bg-[#701c1c] hover:bg-red-700 text-white rounded text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
                                <Play size={12} fill="currentColor" /> Run
                            </button>
                            <button className="text-slate-500 hover:text-white transition-colors">
                                <Save size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Code Editor Placeholder */}
                    <div className="flex-1 p-8 bg-slate-950 overflow-y-auto relative">
                        <div className="absolute left-0 top-0 w-12 h-full bg-slate-900/20 border-r border-slate-800/50 flex flex-col items-center pt-8 text-[10px] text-slate-700 select-none">
                            {[...Array(20)].map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <pre className="pl-10 text-sm md:text-base leading-relaxed text-slate-300">
                            <code className="block">
                                <span className="text-blue-400">#include</span> <span className="text-amber-400">&lt;stdio.h&gt;</span>{'\n\n'}
                                <span className="text-purple-400">int</span> <span className="text-green-400">main</span>() {'{\n'}
                                {'  '}<span className="text-slate-500">// Initialize Silicon Savannah environment</span>{'\n'}
                                {'  '}<span className="text-green-400">printf</span>(<span className="text-amber-400">"Rooting the Baobab...\n"</span>);{'\n'}
                                {'  '}<span className="text-purple-400">return</span> <span className="text-blue-400">0</span>;{'\n'}
                                {'}'}
                            </code>
                        </pre>
                    </div>

                    {/* 3. Integrated Terminal */}
                    <section className="h-1/3 bg-black border-t border-slate-800 flex flex-col shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                        <div className="px-4 py-2 border-b border-slate-900 flex items-center gap-2 text-[10px] font-black uppercase text-slate-500">
                            <Terminal size={12} /> Console Output
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto text-[12px] leading-6">
                            {terminalOutput.map((line, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="text-[#701c1c] font-bold">➜</span>
                                    <span className={line.startsWith('>') ? 'text-blue-400' : 'text-slate-300'}>{line}</span>
                                </div>
                            ))}
                            <div className="flex gap-2">
                                <span className="text-[#701c1c] font-bold">➜</span>
                                <span className="w-2 h-5 bg-[#701c1c] animate-pulse"></span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </AnimatedPage>
    );
};

/* Helper Components */
const FileItem = ({ name, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group ${active ? 'bg-[#701c1c]/10 text-white' : 'hover:bg-slate-800 text-slate-500'}`}
    >
        <ChevronRight size={14} className={`transition-transform ${active ? 'rotate-90 text-[#701c1c]' : 'group-hover:translate-x-1'}`} />
        <span className="text-xs font-bold tracking-tight">{name}</span>
    </button>
);

const SystemStat = ({ icon, label, value }) => (
    <div className="flex items-center justify-between text-[10px] font-bold">
        <div className="flex items-center gap-2 text-slate-500 uppercase tracking-widest">
            {icon} {label}
        </div>
        <span className="text-slate-300">{value}</span>
    </div>
);

export default Lab;