import React from 'react';
import HatvpSearch from './HatvpSearch.js';

const DeclarationReader = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Declaration Reader</h1>
        <p className="text-gray-700 mb-4">
          Search the name, surname, and/or job title of a representative to see the declaration content. <br/>
          🚧 A prettier reading interface will come soon. 🚧
        </p>
        <HatvpSearch/>
      </div>
    </div>
  );
}

export default DeclarationReader;
