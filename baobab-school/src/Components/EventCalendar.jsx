import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight } from 'lucide-react';
import { events } from '../Data/events';

const EventCalendar = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="flex items-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <CalendarIcon className="w-4 h-4 mr-3 text-[#701c1c]" /> 
          Registry Timeline: 2026.Q1
        </h3>
        <span className="text-[10px] font-mono text-[#701c1c] dark:text-[#ff4d4d] animate-pulse">
          ● System Live
        </span>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="group relative pl-8 border-l border-slate-100 dark:border-slate-800 hover:border-[#701c1c] transition-colors cursor-pointer">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 group-hover:bg-[#701c1c] transition-colors" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
                <h4 className="text-sm font-black dark:text-white group-hover:text-[#701c1c] transition-colors">
                  {event.title}
                </h4>
                
                <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {event.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} /> {event.location}
                  </span>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[9px] font-black uppercase tracking-tighter hover:bg-[#701c1c] hover:text-white transition-all">
                Registry Open <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;