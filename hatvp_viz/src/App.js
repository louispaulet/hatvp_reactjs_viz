import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Data from './components/Data';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import GenderEquality from './dashboards/gender_equality';
import PublicationRate from './dashboards/publication_rate';
import DeclarationReader from './components/declaration_reader';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App-outer">
        <div className="App-inner">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/data" element={<Data />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gender_equality" element={<GenderEquality />} />
            <Route path="/publication_rate" element={<PublicationRate />} />
            <Route path="/declaration_reader" element={<DeclarationReader />} />
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Contact />
      </div>
    </Router>
  );
}

export default App;
