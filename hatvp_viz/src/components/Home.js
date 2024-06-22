import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Intro section
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">Monitoring Transparency in Public Life</h2>
          <p className="mt-2 text-lg text-gray-700">
            Explore comprehensive data on the declarations of interest of representatives and registered lobbying organizations using the HATVP datasets.
          </p>
        </div>
        
        <div className="flex flex-col space-y-4">
          {/* Links to plots */}
          <Link className="bg-indigo-600 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105" to="/gender_equality">👩👨 Gender Equality Dashboard</Link>
          <Link className="bg-yellow-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-transform transform hover:scale-105" to="/publication_rate">⌛️ Publication Rate Dashboard</Link>
          <Link className="bg-green-500 text-white text-center py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105" to="/declaration_reader">📜 Declaration Reader</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
