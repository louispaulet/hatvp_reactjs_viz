import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-90 shadow-lg relative z-10 ">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold text-gray-800">Transparency Watch</h1></Link>
        <ul className="flex space-x-4">
          <li><Link className="text-gray-600 hover:text-gray-900" to="/">Home</Link></li>
          <li><Link className="text-gray-600 hover:text-gray-900" to="/about">About</Link></li>
          <li><Link className="text-gray-600 hover:text-gray-900" to="/data">Data source</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
