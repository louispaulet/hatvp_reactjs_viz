import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="App-hero">
      <h2>404 - Page Not Found</h2>
      <p>
        Sorry, the page you are looking for does not exist. Please check the URL or go back to the home page.
      </p>
      <Link className="App-button" to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;
