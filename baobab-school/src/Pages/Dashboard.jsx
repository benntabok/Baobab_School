import React from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { LayoutGrid, Activity, BookOpen, Code, Terminal } from 'lucide-react';

const Dashboard = () => {
  return (
    <AnimatedPage>
      <div className="bg-slate-50 dark:bg-slate-950 min-h-screen p-6 lg:px-20 py-12 text-slate-900 dark:text-slate-100 font-sans">
        
        {/* Profile Summary Section */}
        <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[#701c1c] dark:text-[#ff4d4d] text-[10px] font-black uppercase tracking-[0.3em] mb-2">Student Profile</p>
            <h1 className="text-4xl font-serif font-black">Amos Omari</h1>
            <p className="text-slate-500 text-sm mt-1">Systems Architecture Track · Batch 2026.A</p>
          </div>
          <div className="flex gap-4">
             <StatMini label="Global Rank" value="#42" />
             <StatMini label="Lab Hours" value="128h" />
             <StatMini label="Grit Score" value="98%" />
          </div>
        </header>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Column: Activity & Courses */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Heatmap Placeholder */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center text-xs font-black uppercase tracking-widest">
                  <Activity className="w-4 h-4 mr-2 text-[#701c1c]" /> 
                  Neural Commitment Heatmap
                </h3>
                <span className="text-[10px] text-slate-400">Last 12 Months</span>
              </div>
              {/* Simple Heatmap Grid */}
              <div className="flex flex-wrap gap-1">
                {[...Array(84)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-sm ${
                      i % 7 === 0 ? 'bg-[#701c1c]' : 
                      i % 5 === 0 ? 'bg-[#701c1c]/60' : 
                      i % 3 === 0 ? 'bg-[#701c1c]/30' : 
                      'bg-slate-100 dark:bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </section>

            {/* Course Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <CourseCard 
                title="Advanced C & Pointers" 
                progress={85} 
                icon={<Terminal className="w-5 h-5" />} 
                status="In Progress"
              />
              <CourseCard 
                title="Network Protocols" 
                progress={30} 
                icon={<Code className="w-5 h-5" />} 
                status="Paused"
              />
            </div>
          </div>

          {/* Sidebar: Notifications & Achievements */}
          <aside className="space-y-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6">Recent Achievements</h3>
              <div className="space-y-4">
                <Achievement icon="🏆" title="Memory Leak Hunter" date="2 days ago" />
                <Achievement icon="⚡" title="Fastest Compiler" date="1 week ago" />
                <Achievement icon="🌲" title="Baobab Elder" date="Active" />
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="font-bold mb-2">Ready for Track III?</h4>
                <p className="text-[10px] opacity-70 mb-4 uppercase tracking-widest">Compiler Design</p>
                <button className="w-full py-3 bg-[#701c1c] rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-red-800 transition">
                  Unlock Entrance Exam
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 text-white/5 group-hover:scale-110 transition-transform duration-700">
                 <LayoutGrid size={120} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AnimatedPage>
  );
};

/* Helper Components */
const StatMini = ({ label, value }) => (
  <div className="text-right border-l border-slate-200 dark:border-slate-800 pl-4">
    <p className="text-[9px] font-black uppercase text-slate-400">{label}</p>
    <p className="text-xl font-serif font-bold italic">{value}</p>
  </div>
);

const CourseCard = ({ title, progress, icon, status }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-[#701c1c] transition-colors cursor-pointer group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-[#701c1c] group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="text-[9px] font-bold uppercase text-[#701c1c]">{status}</span>
    </div>
    <h4 className="font-bold mb-4">{title}</h4>
    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
      <div className="h-full bg-[#701c1c] transition-all duration-1000" style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const Achievement = ({ icon, title, date }) => (
  <div className="flex items-center gap-4">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-[11px] font-bold dark:text-white">{title}</p>
      <p className="text-[9px] text-slate-400 uppercase tracking-tighter">{date}</p>
    </div>
  </div>
);

export default Dashboard;