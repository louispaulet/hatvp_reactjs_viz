import React, { useEffect, useState } from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';
import GenderCountPerMandateType from './../plots/gender_count_per_mandate_type.js';
import GenderChoropleth from './../plots/gender_choropleth.js';

const GenderEquality = () => {
  return (
  <div>
    <h1>Gender Equality Analysis on HATVP Data</h1>
    <p>This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives.</p>
    <SurnameCount/>
    <TotalGenderRatio/>
    <GenderCountPerMandateType/>
    <GenderChoropleth/>
  </div>
  );
  
}

export default GenderEquality;
