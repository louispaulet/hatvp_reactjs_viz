import React, { useEffect, useState } from 'react';
import SurnameCount from './../plots/surname_count.js';

const GenderEquality = () => {
  return (
  <div>
    <h1>Gender Equality Analysis on HATVP Data</h1>
    <p>This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives.</p>
    <SurnameCount />
  </div>
  );
  
}

export default GenderEquality;
