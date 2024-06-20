import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Intro section
  return (
    <div className="App-hero">
        <div>
          <h2>Monitoring Transparency in Public Life</h2>
          <p>
            Explore comprehensive data on the declarations of interest of representatives and registered lobbying organizations using the HATVP datasets.
          </p>
          {/* Links to plots */}
          <p><Link className="App-button" to="/gender_equality">👩👨 Gender Equality Dashboard</Link></p>
          <p><Link className="App-button" to="/publication_rate">⌛️ Publication Rate Dashboard</Link></p>
       </div>
    
    <div className="App-hero">
    
    </div>
    </div>
    
  );
}

export default Home;
