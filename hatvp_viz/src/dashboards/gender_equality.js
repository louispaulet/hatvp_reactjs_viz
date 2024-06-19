import React, { useEffect, useState } from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';

const GenderEquality = () => {
  return (
  <div>
    <h1>Gender Equality Analysis on HATVP Data</h1>
    <p>This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives.</p>
    <SurnameCount />
    <TotalGenderRatio />
  </div>
  );
  
}

export default GenderEquality;
