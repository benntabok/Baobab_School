import React, { useState, useEffect } from 'react';
import { pythonLesson1 } from '../../data/pythonLesson1';

const PythonLessonView = () => {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock/date every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-KE', options); // Using Kenyan locale formatting
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Date & Progress Widget */}
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-sm font-semibold text-green-700">{formatDate(currentTime)}</p>
          <p className="text-xs text-gray-500">Baobab Learning Terminal</p>
        </div>
        <div className="w-1/3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold border-b pb-2">{pythonLesson1.title}</h1>

      {/* Resources & Prerequisites Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <section className="bg-blue-50 p-4 rounded-lg">
          <h2 className="font-bold text-blue-800 mb-2">📚 Resources</h2>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {pythonLesson1.resources.map(res => (
              <li key={res.name}><a href={res.url} className="text-blue-600 hover:underline">{res.name}</a></li>
            ))}
          </ul>
        </section>

        <section className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
          <h2 className="font-bold text-orange-800 mb-2">⚠️ Prerequisites</h2>
          <ul className="list-disc ml-5 text-sm space-y-1">
            {pythonLesson1.prerequisites.map(pre => <li key={pre}>{pre}</li>)}
          </ul>
        </section>
      </div>

      {/* Multiple Choice Section */}
      <section className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="font-bold text-xl mb-4">Knowledge Check</h2>
        <p className="mb-4">{pythonLesson1.quiz[0].question}</p>
        <div className="space-y-2">
          {pythonLesson1.quiz[0].options.map((opt, i) => (
            <button key={i} onClick={() => setProgress(50)} className="w-full text-left p-3 border rounded hover:bg-green-50 transition">
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* Code Section */}
      <section className="p-6 bg-gray-900 rounded-xl text-white font-mono">
        <h2 className="text-green-400 mb-4 text-lg">Your First Script: hello_baobab.py</h2>
        <div className="bg-black p-4 rounded border border-gray-700">
          <p className="text-gray-400"># Lesson 1: Print to console</p>
          <p><span className="text-blue-400">name</span> = <span className="text-yellow-200">"Student"</span></p>
          <p><span className="text-purple-400">print</span>(f<span className="text-yellow-200">"Welcome to Baobab, {"{name}"}!"</span>)</p>
        </div>
        <button 
          onClick={() => setProgress(100)}
          className="mt-4 bg-green-600 px-6 py-2 rounded font-bold hover:bg-green-700"
        >
          Mark as Completed
        </button>
      </section>
    </div>
  );
};

export default PythonLessonView;