import React, { useState } from 'react';
import RevenuePerCategory from './../plots/barplot_revenue_per_category.js';
import RevenuePerCategoryPerYear from './../plots/barplot_revenue_per_category_per_year.js';
import RevenuePerGenderPerYear from './../plots/barplot_revenue_per_year_per_gender.js';
import TotalGenderRevenue from './../plots/total_gender_revenue.js';

const ReportedRevenue = () => {
  const [dataset, setDataset] = useState('full');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 via-gray-200 to-red-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-12 p-12 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Reported revenue!</h1>
          <p className="mt-4 text-xl text-gray-700">
            This dashboard shows date-centric plots to analyze the posting and publication rate of declarations.
            <br />
            The goal is to show how fast, or slow, the HATVP works on the submitted declarations.
            <br />
            We also show the document types submitted, as well as their geographical origin.
          </p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">
            Choose between all declarations or only the last declaration for each unique individual:
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                className="form-radio text-blue-700" 
                value="full" 
                checked={dataset === 'full'} 
                onChange={handleDatasetChange} 
              />
              <span className="ml-2 text-gray-800">Full Dataset</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                className="form-radio text-blue-700" 
                value="latest" 
                checked={dataset === 'latest'} 
                onChange={handleDatasetChange} 
              />
              <span className="ml-2 text-gray-800">Latest Dataset</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className=" rounded-lg shadow p-4"><RevenuePerCategory /></div>
          <div className=" rounded-lg shadow p-4"><RevenuePerCategoryPerYear /></div>
          <div className=" rounded-lg shadow p-4"><RevenuePerGenderPerYear /></div>
          <div className=" rounded-lg shadow p-4"><TotalGenderRevenue /></div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">
            Choose between all declarations or only the last declaration for each unique individual:
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input 
                type="radio" 
                className="form-radio text-blue-700" 
                value="full" 
                checked={dataset === 'full'} 
                onChange={handleDatasetChange} 
              />
              <span className="ml-2 text-gray-800">Full Dataset</span>
            </label>
            <label className="flex items-center">
              <input 
                type="radio" 
                className="form-radio text-blue-700" 
                value="latest" 
                checked={dataset === 'latest'} 
                onChange={handleDatasetChange} 
              />
              <span className="ml-2 text-gray-800">Latest Dataset</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportedRevenue;
