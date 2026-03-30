import React, { useState } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, PlayCircle, BookOpen, FileText } from 'lucide-react';
import useAuthStore from '../Store/useAuthStore';

const CoursePage = ({ markdownString }) => {
  const { data, content } = matter(markdownString);
  const { theme } = useAuthStore();
  const navigate = useNavigate();
  
  // Initial code can be passed via frontmatter in your markdown
  const [code, setCode] = useState(data.initial_code || "// Initialize module...\n");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      
      {/* --- TOP NAVIGATION BREADCRUMB --- */}
      <nav className="h-12 border-b border-gray-100 dark:border-slate-800 flex items-center px-6 justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#701c1c] transition">
          <ArrowLeft size={14} /> Back to Hub
        </button>
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#701c1c]">
          VFS://COURSES/{data.slug?.toUpperCase()}
        </div>
        <div className="w-24"></div> {/* Spacer */}
      </nav>

      <main className="flex flex-col lg:flex-row h-[calc(100vh-48px)] overflow-hidden">
        
        {/* --- LEFT SIDE: THEORY & RESOURCES (Scrollable) --- */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar border-r border-gray-100 dark:border-slate-800">
          <div className="max-w-2xl mx-auto">
            <header className="mb-10">
              <h1 className="text-4xl font-serif font-black mb-2 dark:text-white leading-tight">
                {data.title}
              </h1>
              <p className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase tracking-tighter">
                Path: /ngong_hub/curriculum/{data.slug}
              </p>
            </header>

            {/* 1. Resources Section (Video) */}
            <section className="mb-12">
              <div className="aspect-video mb-6 bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${data.video_id}`}
                  title="Course Video"
                  allowFullScreen
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800">
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={12} className="text-[#701c1c]" /> Attachments
                  </h3>
                  <ul className="space-y-2">
                    {data.resources?.map((res, i) => (
                      <li key={i}>
                        <a href={res.link} className="text-xs text-blue-500 hover:underline flex items-center gap-2">
                          {res.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#701c1c]/5 rounded-xl border border-[#701c1c]/10">
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2 text-[#701c1c]">
                    <Zap size={12} /> Objectives
                  </h3>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 italic">
                    {data.objectives?.map((obj, i) => <li key={i}>• {obj}</li>)}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. The Markdown Content */}
            <article className="prose prose-slate dark:prose-invert max-w-none mb-20 
              prose-headings:font-serif prose-headings:font-black prose-a:text-[#701c1c]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </div>
        </div>

        {/* --- RIGHT SIDE: THE COURSE EDITOR (Fixed) --- */}
        <div className="w-full lg:w-[40%] flex flex-col bg-slate-50 dark:bg-black border-l border-gray-100 dark:border-slate-800">
          <div className="h-10 border-b border-gray-100 dark:border-slate-800 flex items-center px-4 justify-between bg-white dark:bg-slate-900">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <BookOpen size={10} /> Live_Exercise.bin
            </span>
            <div className="text-[9px] font-mono text-green-600 animate-pulse">● EDITOR_ACTIVE</div>
          </div>
          
          <div className="flex-1">
            <Editor
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              language={data.language || 'javascript'}
              value={code}
              onChange={(val) => setCode(val)}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                fontFamily: 'monospace',
                padding: { top: 20 },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                glyphMargin: false,
                folding: false,
              }}
            />
          </div>

          {/* ACTION FOOTER */}
          <div className="p-6 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
            <button 
              onClick={() => navigate('/lab')}
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#701c1c] dark:hover:bg-[#701c1c] dark:hover:text-white transition-all shadow-2xl"
            >
              Commit Changes & Launch Full Lab <Zap size={14} fill="currentColor" />
            </button>
            <p className="text-center text-[8px] text-slate-400 uppercase mt-4 tracking-tighter">
              Pressing the button will migrate current buffer to the production environment
            </p>
          </div>
        </div>

      </main>
    </div>
  );
};

export default CoursePage;