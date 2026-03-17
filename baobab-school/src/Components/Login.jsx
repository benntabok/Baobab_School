import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../Store/useAuthStore';

const Login = () => {
  const [studentId, setStudentId] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(studentId);
    if (success) {
      navigate(`/dashboard/${studentId}`);
    } else {
      alert("Invalid Registry ID. Access Denied.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h2 className="text-2xl font-serif font-black mb-6 uppercase tracking-tighter italic">Initialize Session</h2>
        <input 
          className="w-full bg-slate-800 p-4 rounded-xl mb-4 border border-slate-700 focus:border-[#701c1c] outline-none transition-all"
          placeholder="Enter Registry ID (e.g., amos-01)"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
        <button className="w-full py-4 bg-[#701c1c] rounded-xl font-black uppercase tracking-widest hover:bg-red-800 transition-all">
          Authorize Access
        </button>
      </form>
    </div>
  );
};