import React, { useState } from 'react';
import SurnameCount from './../plots/surname_count.js';
import TotalGenderRatio from './../plots/total_gender_ratio.js';
import GenderCountPerMandateType from './../plots/gender_count_per_mandate_type.js';
import GenderChoropleth from './../plots/gender_choropleth.js';

const GenderEquality = () => {
  const [dataset, setDataset] = useState('full');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">👩👨 Gender Equality Analysis on HATVP Data</h1>
      <p className="text-gray-700 mb-6">
        This dashboard shows gendered plots to reveal the existing imbalance between men and women representatives.
        <br /> The gender equality is measured through surnames, ratio between "Mr" and "Mme" civility prefix, mandate type, and ratio of women to men per geographical region.
      </p>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-800">
          Choose between all declarations or only the last declaration for each unique individual:
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              className="form-radio text-indigo-600" 
              value="full" 
              checked={dataset === 'full'} 
              onChange={handleDatasetChange} 
            />
            <span className="ml-2 text-gray-800">Full Dataset</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              className="form-radio text-indigo-600" 
              value="latest" 
              checked={dataset === 'latest'} 
              onChange={handleDatasetChange} 
            />
            <span className="ml-2 text-gray-800">Latest Dataset</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4"><SurnameCount dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><TotalGenderRatio dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><GenderCountPerMandateType dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><GenderChoropleth dataset={dataset} /></div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-medium text-gray-800">
          Choose between all declarations or only the last declaration for each unique individual:
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input 
              type="radio" 
              className="form-radio text-indigo-600" 
              value="full" 
              checked={dataset === 'full'} 
              onChange={handleDatasetChange} 
            />
            <span className="ml-2 text-gray-800">Full Dataset</span>
          </label>
          <label className="flex items-center">
            <input 
              type="radio" 
              className="form-radio text-indigo-600" 
              value="latest" 
              checked={dataset === 'latest'} 
              onChange={handleDatasetChange} 
            />
            <span className="ml-2 text-gray-800">Latest Dataset</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default GenderEquality;