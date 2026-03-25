import React from 'react';
import { embeddedSyllabus } from '../../Data/Courses';

const EmbeddedSystems = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-green-800 mb-4">{embeddedSyllabus.title}</h1>
      <p className="text-gray-600 mb-6">Master the art of coding "close to the metal."</p>

      {/* Pricing Card */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
        <h2 className="font-bold text-xl text-green-900">Tuition: Ksh {embeddedSyllabus.price}</h2>
        <p className="text-sm text-green-700 font-medium mt-1">
          Lipa Mdogo Mdogo: Ksh 5,000 deposit + 2 monthly installments.
        </p>
      </div>

      {/* Curriculum Accordion */}
      <div className="space-y-4">
        {embeddedSyllabus.modules.map((mod) => (
          <div key={mod.week} className="border rounded p-4 hover:bg-gray-50 transition">
            <h3 className="font-bold text-lg">Week {mod.week}: {mod.title}</h3>
            <ul className="list-disc ml-5 text-gray-600">
              {mod.topics.map(topic => <li key={topic}>{topic}</li>)}
            </ul>
          </div>
        ))}
      </div>
      
      <button className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700">
        Enroll for the Next Cohort
      </button>
    </div>
  );
};

export default EmbeddedSystems;