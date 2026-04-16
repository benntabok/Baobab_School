import React from 'react';

const StudentList = ({ students }) => {
  // Helper to style the status badges
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Fully Paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'Deposit Paid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">First Cohort: Embedded C</h2>
        <span className="text-sm font-medium text-gray-500">{students.length} Enrolled</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-xs uppercase text-gray-400 bg-gray-50 font-semibold">
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Contact</th>
              <th className="px-6 py-3">Hardware Kit</th>
              <th className="px-6 py-3">Payment Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{student.phone}</td>
                <td className="px-6 py-4">
                  {student.hasKit ? (
                    <span className="text-green-600 flex items-center gap-1 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                      Issued
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm italic">Not Issued</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-green-600 hover:text-green-800 text-sm font-bold">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;