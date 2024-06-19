import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Data from './components/Data';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import GenderEquality from './dashboards/gender_equality';
import './App.css';

function App() {
  return (
    <Router basename="/hatvp_reactjs_viz">
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/data" element={<Data />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gender_equality" element={<GenderEquality />} />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
