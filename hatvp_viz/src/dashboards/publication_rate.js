import React, { useState } from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';
import GenderCountPerMandateType from './../plots/gender_count_per_mandate_type.js';
import GenderChoropleth from './../plots/gender_choropleth.js';
import './../App.css';

const PublicationRate = () => {
  const [dataset, setDataset] = useState('full');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="gender-equality-container">
      <h1>Publication rate of HATVP declarations</h1>
      <p>This dashboard shows date-centric plots to analyze the posting and publication rate of declarations. <br/>
      The goal is to show how fast, or slow, the HATVP works on the submitted declarations.  
      </p>
      <div className="dataset-selector">
      <label> Choose between all declarations or only the last declaration for each unique individual:  </label>
        <label>
          <input 
            type="radio" 
            value="full" 
            checked={dataset === 'full'} 
            onChange={handleDatasetChange} 
          />
          Full Dataset
        </label>
        <label>
          <input 
            type="radio" 
            value="latest" 
            checked={dataset === 'latest'} 
            onChange={handleDatasetChange} 
          />
          Latest Dataset
        </label>
      </div>
      <div className="plots-grid">
        <div className="plot-item"><SurnameCount dataset={dataset} /></div>
        <div className="plot-item"><TotalGenderRatio dataset={dataset} /></div>
        <div className="plot-item"><GenderCountPerMandateType dataset={dataset} /></div>
        <div className="plot-item"><GenderChoropleth dataset={dataset} /></div>
      </div>
      <div className="dataset-selector">
      <label> Choose between all declarations or only the last declaration for each unique individual:  </label>
        <label>
          <input 
            type="radio" 
            value="full" 
            checked={dataset === 'full'} 
            onChange={handleDatasetChange} 
          />
          Full Dataset
        </label>
        <label>
          <input 
            type="radio" 
            value="latest" 
            checked={dataset === 'latest'} 
            onChange={handleDatasetChange} 
          />
          Latest Dataset
        </label>
      </div>
    </div>
  );
}

export default PublicationRate;
