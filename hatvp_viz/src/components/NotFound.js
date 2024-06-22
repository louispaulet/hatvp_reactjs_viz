import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">404 - Page Not Found</h2>
        <p className="text-gray-700 mb-6">
          Sorry, the page you are looking for does not exist. Please check the URL or go back to the home page.
        </p>
        <Link className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors" to="/">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFound;