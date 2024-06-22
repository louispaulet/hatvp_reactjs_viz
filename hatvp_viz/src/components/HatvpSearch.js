import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import HatvpReader from './HatvpReader.js'

const HatvpSearch = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrl, setSelectedUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('./datasets/people_in_dataset_and_xml_urls.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          },
        });
      })
      .catch((error) => console.error('Error fetching the CSV file:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleSelect = (url) => {
    setSelectedUrl(url);
  };

  const filteredData = data.filter((item) =>
    item.searchable_field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <ul className="space-y-2 mb-4">
        {currentData.map((item, index) => (
          <li
            key={index}
            onClick={() => handleSelect(item.xml_url)}
            className="px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gray-200 rounded-md"
          >
            {item.searchable_field}
          </li>
        ))}
      </ul>
      <div className="flex justify-center space-x-2 mb-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
      <HatvpReader url={selectedUrl} />
    </div>
  );
};

export default HatvpSearch;
