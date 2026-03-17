import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';
import { students } from '../Data/students';
import { ShieldCheck, Lock } from 'lucide-react';
import AnimatedPage from '../Components/AnimatedPage';

const Login = () => {
    const [studentId, setStudentId] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();
    const location = useLocation();

    // Determine where to send them after login (default to their dashboard)
    const from = location.state?.from?.pathname || `/dashboard/${studentId}`;

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Find the student in our registry
        const student = students.find(s => s.id.toLowerCase() === studentId.toLowerCase());

        if (student) {
            login(student); // Update global state
            navigate(from, { replace: true }); // Send them to the protected page
        } else {
            setError("Registry ID not recognized. Access Denied.");
        }
    };

    return (
        <AnimatedPage>
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 font-sans">
                <div className="w-full max-w-md bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-[#701c1c] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-red-900/20">
                            <Lock className="text-white" size={28} />
                        </div>
                        <h2 className="text-2xl font-serif font-black uppercase italic tracking-tighter dark:text-white text-slate-900">
                            Initialize Session
                        </h2>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-2">
                            Secure Registry Access
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 focus:border-[#701c1c] dark:focus:border-[#ff4d4d] outline-none transition-all dark:text-white placeholder:text-slate-400 text-sm font-medium"
                                placeholder="Enter Registry ID (e.g., amos-01)"
                                value={studentId}
                                onChange={(e) => {
                                    setStudentId(e.target.value);
                                    setError('');
                                }}
                            />
                            {error && <p className="text-[10px] text-red-500 font-bold uppercase mt-3 ml-2 italic tracking-wider">{error}</p>}
                        </div>

                        <button className="w-full py-5 bg-[#701c1c] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-red-800 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-red-900/10">
                            <ShieldCheck size={16} />
                            Authorize Access
                        </button>
                    </form>

                    <p className="text-center text-[9px] text-slate-400 mt-8 uppercase tracking-widest font-medium">
                        Baobab School of Computing · Neural Node v1.0
                    </p>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Login;