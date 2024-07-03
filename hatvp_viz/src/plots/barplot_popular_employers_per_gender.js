import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const PopularEmployersPerYear = ({dataset}) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch(`./datasets/revenue/declared_value_per_gender_and_employer_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              employer: row.employer,
              F_revenue: parseFloat(row.F_revenue),
              M_revenue: parseFloat(row.M_revenue),
            }));
            setData(parsedData);
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const COLORS = {
    F_revenue: '#ff69b4',
    M_revenue: '#4169e1',
  };

  const formatYAxis = (tickItem) => {
      if (currentPage === 0) {
        return `${(tickItem / 1000000).toFixed(0)}M€`;
      } else {
        return `${(tickItem / 1000).toFixed(0)}k€`;
      }
    
  };

  const displayedData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Top 100 most popular employers</h2>
      <p> We selected the top 100 employers by total reported revenue. <br/>
      The employers have been selected as "popular" if at least 2 persons declared the same employer.  <br/>
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={displayedData}
          margin={{
            top: 20, right: 30, left: 30, bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="employer" tick={{ angle: -45, textAnchor: 'end', fontSize: 8 }} interval={0}>
            <Label value="Employer" position="insideBottom" dy={50} />
          </XAxis>
          <YAxis tickFormatter={formatYAxis}>
            <Label value="Total Amount" angle={270} position="insideLeft" offset={-5} dx={-10} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend verticalAlign="top" />
          <Bar dataKey="F_revenue" stackId="a" fill={COLORS.F_revenue} name="Women" />
          <Bar dataKey="M_revenue" stackId="a" fill={COLORS.M_revenue} name="Men" />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-between mt-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handlePrevPage}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {currentPage + 1}/{totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded ${(currentPage + 1) * rowsPerPage >= data.length ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleNextPage}
          disabled={(currentPage + 1) * rowsPerPage >= data.length}
        >
          Next
        </button>
      </div>
    </section>
  );
}

export default PopularEmployersPerYear;
