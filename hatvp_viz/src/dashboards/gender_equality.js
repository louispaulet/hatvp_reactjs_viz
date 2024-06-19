import React from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';
import GenderCountPerMandateType from './../plots/gender_count_per_mandate_type.js';
import GenderChoropleth from './../plots/gender_choropleth.js';
import './../App.css';

const GenderEquality = () => {
  return (
    <div className="gender-equality-container">
      <h1>Gender Equality Analysis on HATVP Data</h1>
      <p>This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives.</p>
      <div className="plots-grid">
        <div className="plot-item"><SurnameCount/></div>
        <div className="plot-item"><TotalGenderRatio/></div>
        <div className="plot-item"><GenderCountPerMandateType/></div>
        <div className="plot-item"><GenderChoropleth/></div>
      </div>
    </div>
  );
}

export default GenderEquality;
