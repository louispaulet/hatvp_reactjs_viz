import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerCategoryPerYear = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/total_revenue_per_revenue_category_per_year_all_amounts.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              year: row.year,
              job_revenue: parseFloat(row.job_revenue),
              elective_revenue: parseFloat(row.elective_revenue),
              executive_revenue: parseFloat(row.executive_revenue),
            }));
            setData(parsedData);
            console.log(parsedData)
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, []);

  // Define a color palette compatible with color-blind people
  const COLORS = {
    job_revenue: '#0072B2',
    elective_revenue: '#D55E00',
    executive_revenue: '#E69F00'
  };

  // Function to format the Y-axis ticks to "k€"
  const formatYAxis = (tickItem) => {
    return `${(tickItem / 1000000).toFixed(0)}M€`;
  };

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Total revenue per source per year</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year">
            <Label value="Year" position="insideBottom" dy={10} />
          </XAxis>
          <YAxis tickFormatter={formatYAxis}>
            <Label value="Total Amount" angle={270} position="insideLeft" offset={-5} dx={-10} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend />
          <Bar dataKey="job_revenue" stackId="a" fill={COLORS.job_revenue} />
          <Bar dataKey="elective_revenue" stackId="a" fill={COLORS.elective_revenue} />
          <Bar dataKey="executive_revenue" stackId="a" fill={COLORS.executive_revenue} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerCategoryPerYear;
