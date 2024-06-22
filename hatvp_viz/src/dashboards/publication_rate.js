import React, { useState } from 'react';
import DeclarationsPerDateCount from './../plots/declarations_per_date_count.js';
import AverageDelay from './../plots/average_delay.js';
import DocumentTypes from './../plots/document_types.js';
import PublicationsChoropleth from './../plots/publications_choropleth.js';

const PublicationRate = () => {
  const [dataset, setDataset] = useState('full');

  const handleDatasetChange = (event) => {
    setDataset(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">⌛️ Publication rate of HATVP declarations</h1>
      <p className="text-gray-700 mb-6">
        This dashboard shows date-centric plots to analyze the posting and publication rate of declarations. <br/>
        The goal is to show how fast, or slow, the HATVP works on the submitted declarations.  <br/>  
        We also show the document types submitted, as well as their geographical origin.   
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
        <div className="bg-white rounded-lg shadow p-4"><DeclarationsPerDateCount dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><AverageDelay dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><DocumentTypes dataset={dataset} /></div>
        <div className="bg-white rounded-lg shadow p-4"><PublicationsChoropleth dataset={dataset} /></div>
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

export default PublicationRate;