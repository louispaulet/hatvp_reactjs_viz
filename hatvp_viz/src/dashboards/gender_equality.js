import React, { useState } from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';
import GenderCountPerMandateType from './../plots/gender_count_per_mandate_type.js';
import GenderChoropleth from './../plots/gender_choropleth.js';
import './../App.css';

const GenderEquality = () => {
  const [dataset, setDataset] = useState('full');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="gender-equality-container">
      <h1>👩👨 Gender Equality Analysis on HATVP Data</h1>
      <p>This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives. <br/>
      The gender equality is measured through surnames, ratio between "Mr" and "Mme" civility prefix, mandate type, and ratio of women to men per geographical region.
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

export default GenderEquality;
