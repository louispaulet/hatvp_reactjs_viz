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
          <a className="App-button" href="#learn-more">Learn More</a>
       </div>
    {/* Links to plots */}
    <div className="App-hero">
    <Link to="/gender_equality">Check out our gender equality dashboard!</Link>
    </div>
    </div>
    
  );
}

export default Home;
