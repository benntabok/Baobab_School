import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import useAuthStore from '../Store/useAuthStore';
import { Play, RotateCcw, Terminal, Eye, Clock } from 'lucide-react'; 

const Lab = () => {
    const { theme, user, updateLevel } = useAuthStore();
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('# Initialize Baobab System...\nprint("Hello World")');
    const [output, setOutput] = useState('System ready. Waiting for input...');
    const [isRunning, setIsRunning] = useState(false);
    const [view, setView] = useState('terminal');
    
    // --- NEW STATE: SYSTEM CLOCK ---
    const [currentTime, setCurrentTime] = useState('');

    const iframeRef = useRef(null);

    const templates = {
        python: 'import math\n\ndef main():\n    print("Python Node Active")\n\nmain()',
        c: '#include <stdio.h>\n\nint main() {\n    printf("C Systems Engine Online\\n");\n    printf("Memory Address: %p\\n", (void*)&main);\n    return 0;\n}',
        bash: 'echo "Node: Ngong_Hub_01"\necho "User: $USER"\npwd\nls -la',
        javascript: '// Web Logic\nconsole.log("JS Node Active");',
        html: '<div class="hero">\n  <h1>Silicon Savannah</h1>\n  <p>Engineering Lab v2.0</p>\n</div>\n\n<style>\n  body { background: #0f172a; color: white; font-family: sans-serif; height: 100vh; display: flex; align-items: center; justify-content: center; margin: 0; }\n  .hero { text-align: center; border: 1px solid #701c1c; padding: 2rem; }\n</style>'
    };

    // --- EFFECT: LIVE NAIROBI CLOCK ---
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: 'Africa/Nairobi',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            setCurrentTime(new Intl.DateTimeFormat('en-GB', options).format(now));
        };

        updateClock(); // Initial call
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    // --- EFFECT: SYNC THEME ---
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
    }, [theme]);

    // --- EFFECT: PERSISTENCE (Local Storage) ---
    useEffect(() => {
        const savedCode = localStorage.getItem(`baobab_save_${language}`);
        if (savedCode) setCode(savedCode);
        else setCode(templates[language]);
    }, [language]);

    useEffect(() => {
        localStorage.setItem(`baobab_save_${language}`, code);
    }, [code, language]);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setView(lang === 'html' ? 'preview' : 'terminal');
    };

    const executeCode = async () => {
        setIsRunning(true);
        setOutput('📡 Routing request to Lab Node...');

        if (language === 'html' || language === 'javascript') {
            setView('preview');
            const fullHtml = language === 'html' ? code : `<script>${code}</script>`;
            const blob = new Blob([fullHtml], { type: 'text/html' });
            if (iframeRef.current) iframeRef.current.src = URL.createObjectURL(blob);
            setIsRunning(false);
        } else {
            setView('terminal');
            try {
                const res = await fetch('https://emkc.org/api/v2/piston/execute', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'omit',
                    body: JSON.stringify({
                        language: language,
                        version: '*',
                        files: [{ content: code }],
                    }),
                });

                if (res.status === 401) {
                    setOutput('❌ ERR: Unauthorized (401). Piston API rejected the handshake.');
                    return;
                }

                const data = await res.json();
                if (data.run) {
                    setOutput(data.run.output || '✓ Process exited with code 0.');
                } else {
                    setOutput('⚠️ System Error: Lab Node returned an invalid response.');
                }

            } catch (err) {
                console.error("Lab Error:", err);
                setOutput('❌ ERR: Execution Link Severed. Check Hub connectivity.');
            } finally {
                setIsRunning(false);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-slate-950 transition-colors duration-500 font-sans overflow-hidden">

            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/stardust.png')` }} />

            {/* HEADER */}
            <header className="relative z-10 h-14 border-b border-gray-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md flex justify-between items-center px-6">
                <div className="flex items-center space-x-6">
                    <span className="text-[#701c1c] font-black text-sm tracking-widest uppercase">Baobab_VFS</span>
                    <select
                        className="bg-transparent text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-slate-400 outline-none cursor-pointer border-b border-transparent hover:border-[#701c1c]"
                        value={language}
                        onChange={(e) => handleLanguageChange(e.target.value)}
                    >
                        <option value="python">Python 3.10</option>
                        <option value="c">ANSI C (GCC)</option>
                        <option value="bash">Bash / Unix</option>
                        <option value="html">HTML/CSS Preview</option>
                    </select>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setCode(templates[language])}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Reset to Template"
                    >
                        <RotateCcw size={14} />
                    </button>
                    <button
                        onClick={executeCode}
                        disabled={isRunning}
                        className="bg-[#701c1c] hover:bg-black text-white text-[10px] font-bold px-6 py-2 uppercase tracking-widest shadow-lg transition-all flex items-center gap-2"
                    >
                        {isRunning ? 'COMPILING...' : <><Play size={10} fill="white" /> RUN_MODULE</>}
                    </button>
                </div>
            </header>

            {/* WORKSPACE */}
            <div className="relative z-10 flex flex-1 overflow-hidden">
                <div className="flex-1 border-r border-gray-200 dark:border-slate-800 bg-white dark:bg-[#1e1e1e]">
                    <Editor
                        theme={theme === 'dark' ? 'vs-dark' : 'light'}
                        language={language === 'html' ? 'html' : language}
                        value={code}
                        onChange={(val) => setCode(val)}
                        options={{
                            fontSize: 14,
                            minimap: { enabled: false },
                            fontFamily: 'monospace',
                            scrollBeyondLastLine: false,
                            padding: { top: 20 }
                        }}
                    />
                </div>

                <div className="w-1/3 bg-gray-50 dark:bg-black flex flex-col">
                    <div className="h-10 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                            System_Output
                        </span>
                        <div className="flex gap-2">
                            <Terminal size={12} className={view === 'terminal' ? 'text-[#701c1c]' : 'text-gray-400'} />
                            <Eye size={12} className={view === 'preview' ? 'text-[#701c1c]' : 'text-gray-400'} />
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-auto">
                        {view === 'terminal' ? (
                            <pre className="font-mono text-xs text-slate-700 dark:text-green-500 whitespace-pre-wrap leading-relaxed">
                                {`$ baobab_exec --${language}\n\n${output}`}
                            </pre>
                        ) : (
                            <iframe
                                ref={iframeRef}
                                title="preview"
                                className="w-full h-full bg-white rounded border border-gray-200 shadow-inner"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* THE "WATERMARK MASK" / STATUS FOOTER */}
            <footer className="relative z-50 h-8 bg-black border-t border-slate-800 flex items-center justify-between px-6 font-mono text-[9px] text-slate-500">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-green-600 animate-pulse">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                        HUB_CONNECTED
                    </span>
                    <span className="text-slate-800">|</span>
                    <span className="flex items-center gap-2 uppercase tracking-tighter">
                        <Clock size={10} className="text-slate-600" />
                        {currentTime} EAT
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="uppercase tracking-tighter hidden sm:inline">ID: {user?.id || 'GUEST_01'}</span>
                    <span className="text-slate-800">|</span>
                    <span className="italic text-[10px] text-slate-400">veritas via codice</span>
                </div>
            </footer>
        </div>
    );
};

export default Lab;