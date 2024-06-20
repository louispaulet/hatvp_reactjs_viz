import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import HatvpReader from './HatvpReader';
import './../App.css';

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
    <div className="search-container">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <ul className="search-results">
        {currentData.map((item, index) => (
          <li key={index} onClick={() => handleSelect(item.xml_url)}>
            {item.searchable_field}
          </li>
        ))}
      </ul>
      <div className="pagination-buttons">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
      <HatvpReader url={selectedUrl} />
    </div>
  );
};

export default HatvpSearch;
