import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="App-nav">
      <Link to="/"><h1>Transparency Watch</h1></Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/data">Data source</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
