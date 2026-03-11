import React from 'react';
import { useParams } from 'react-router-dom';
import { students } from '../data/students'; 
import AnimatedPage from '../components/Common/AnimatedPage';
import { LayoutGrid, Activity, Terminal, Code, AlertCircle } from 'lucide-react';

const Dashboard = () => {
    const { id } = useParams();
    const student = students.find(s => s.id === id);

    if (!student) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-[#701c1c] bg-slate-50 dark:bg-slate-950 px-6">
                <AlertCircle size={48} className="mb-4" />
                <h1 className="text-2xl font-black uppercase italic tracking-tighter">Student Node Not Found</h1>
                <p className="opacity-60 text-sm mt-2">Registry entry "{id}" does not exist in the Baobab database.</p>
            </div>
        );
    }

    return (
        <AnimatedPage>
            {/* Added w-full and overflow-x-hidden to prevent layout shift */}
            <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full overflow-x-hidden p-6 lg:px-20 py-12 text-slate-900 dark:text-slate-100 font-sans">
                
                {/* Header: Centered with max-width */}
                <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex-1">
                        <p className="text-[#701c1c] dark:text-[#ff4d4d] text-[10px] font-black uppercase tracking-[0.3em] mb-3">
                            {student.track || "General"} Profile
                        </p>
                        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight">{student.name}</h1>
                        <p className="text-slate-500 text-sm mt-2 font-medium">Registry ID: {student.id} · Batch 2026.A</p>
                    </div>
                    
                    {/* Stats Area */}
                    <div className="flex items-center gap-8 md:gap-12 bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm md:shadow-none md:border-none md:bg-transparent">
                        <StatMini label="Level" value={student.level} />
                        <StatMini label="Rank" value={student.rank || 'N/A'} />
                        <StatMini label="Grit" value={`${student.grit || 0}%`} />
                    </div>
                </header>

                {/* Main Grid: 2/3 Main Content, 1/3 Sidebar */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-8 space-y-10">
                        
                        {/* Heatmap Section */}
                        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <Activity className="w-4 h-4 mr-3 text-[#701c1c]" /> 
                                    Neural Commitment Heatmap
                                </h3>
                                <div className="flex gap-1 text-[8px] font-bold text-slate-400 uppercase">
                                    <span>Less</span>
                                    <div className="w-2 h-2 bg-slate-100 dark:bg-slate-800 rounded-sm"></div>
                                    <div className="w-2 h-2 bg-[#701c1c]/40 rounded-sm"></div>
                                    <div className="w-2 h-2 bg-[#701c1c] rounded-sm"></div>
                                    <span>More</span>
                                </div>
                            </div>
                            {/* Flex-wrap with defined gap ensures it wraps beautifully on mobile */}
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {[...Array(84)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-[3px] transition-all hover:scale-125 cursor-help ${
                                            (i + (student.level * 2)) % 7 === 0 ? 'bg-[#701c1c]' : 
                                            i % 11 === 0 ? 'bg-[#701c1c]/40' : 
                                            'bg-slate-100 dark:bg-slate-800'
                                        }`}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Course Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {student.courses?.map((course, index) => (
                                <CourseCard 
                                    key={index}
                                    title={course.name} 
                                    progress={course.progress} 
                                    icon={course.type === 'sys' ? <Terminal size={18}/> : <Code size={18}/>} 
                                    status={course.progress === 100 ? "Verified" : "Syncing"}
                                />
                            )) || <p className="text-xs opacity-50 italic">No modules loaded in registry.</p>}
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Achievements */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
                            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Recent Accolades</h3>
                            <div className="space-y-6">
                                {student.achievements?.map((ach, i) => (
                                    <Achievement key={i} icon={ach.icon} title={ach.title} date={ach.date} />
                                )) || <p className="text-[10px] opacity-40 italic">Waiting for system breakthrough...</p>}
                            </div>
                        </div>

                        {/* Call to Action: The Lab */}
                        <div className="bg-slate-900 dark:bg-[#0a0f1d] text-white p-8 rounded-3xl relative overflow-hidden group shadow-2xl">
                            <div className="relative z-10">
                                <h4 className="text-xl font-serif font-bold mb-2 italic">Next Phase</h4>
                                <p className="text-[10px] opacity-60 mb-6 uppercase tracking-widest font-black">
                                    {student.nextMilestone || "Initialize Lab Access"}
                                </p>
                                <button className="w-full py-4 bg-[#701c1c] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-800 transition-all active:scale-95 shadow-lg">
                                    Initiate Compiler
                                </button>
                            </div>
                            {/* Decorative background icon */}
                            <div className="absolute -right-6 -bottom-6 text-white/5 group-hover:text-white/10 group-hover:rotate-12 transition-all duration-700">
                                <LayoutGrid size={160} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </AnimatedPage>
    );
};

/* Re-styled Helper Components */
const StatMini = ({ label, value }) => (
    <div className="text-right border-l-2 border-slate-200 dark:border-slate-800 pl-6">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-serif font-black italic dark:text-white">{value}</p>
    </div>
);

const CourseCard = ({ title, progress, icon, status }) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl hover:shadow-xl hover:border-[#701c1c] dark:hover:border-[#ff4d4d] transition-all group cursor-pointer">
        <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl group-hover:bg-[#701c1c] group-hover:text-white transition-all">
                {icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest text-[#701c1c] dark:text-[#ff4d4d]">{status}</span>
        </div>
        <h4 className="font-bold text-lg mb-6 leading-tight group-hover:text-[#701c1c] dark:group-hover:text-[#ff4d4d] transition-colors">{title}</h4>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-[#701c1c] transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const Achievement = ({ icon, title, date }) => (
    <div className="flex items-center gap-5 group cursor-default">
        <div className="text-3xl grayscale group-hover:grayscale-0 transition-all group-hover:scale-110">{icon}</div>
        <div>
            <p className="text-[12px] font-black dark:text-white tracking-tight leading-none mb-1">{title}</p>
            <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">{date}</p>
        </div>
    </div>
);

export default Dashboard;