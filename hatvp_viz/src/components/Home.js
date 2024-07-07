import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    console.log('My Secret:', process.env.REACT_APP_GROQ_API_KEY);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-gray-200 to-red-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-12 p-12 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Monitoring Transparency in Public Life</h2>
          <p className="mt-4 text-xl text-gray-700">
            Explore comprehensive data on the declarations of interest of representatives and registered lobbying organizations using the HATVP datasets.
          </p>
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Links to plots */}
          <Link className="border-2 border-blue-700 text-black text-center py-4 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3 text-lg" to="/gender_equality">
            <span role="img" aria-label="gender equality">👩👨</span>
            <span>Gender Equality Dashboard</span>
          </Link>
          <Link className="border-2 border-gray-700 text-black text-center py-4 px-8 rounded-lg shadow-lg hover:bg-gray-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3 text-lg" to="/publication_rate">
            <span role="img" aria-label="publication rate">⌛️</span>
            <span>Publication Rate Dashboard</span>
          </Link>
          <Link className="border-2 border-red-700 text-black text-center py-4 px-8 rounded-lg shadow-lg hover:bg-red-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3 text-lg" to="/reported_revenue">
            <span role="img" aria-label="publication rate">💰</span>
            <span>Reported Revenue Dashboard</span>
          </Link>
          <Link className="border-2 border-green-700 text-black text-center py-4 px-8 rounded-lg shadow-lg hover:bg-green-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-3 text-lg" to="/declaration_reader">
            <span role="img" aria-label="declaration reader">📜</span>
            <span>Declaration Reader</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
