import React from 'react';
import HatvpSearch from './HatvpSearch.js';
import './../App.css';

const DeclarationReader = () => {


  return (
    <div className="App-hero">
      <h1>Declaration Reader</h1>
      <p> Search the name, surname, and/or job title of a representative to see the declaration content. <br/>
      🚧 A prettier reading interface will come soon. 🚧 </p>
      <HatvpSearch/>
    </div>
  );
}

export default DeclarationReader;
