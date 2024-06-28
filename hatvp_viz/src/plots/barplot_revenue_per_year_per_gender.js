import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerGenderPerYear = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/declared_value_per_gender_and_year_all_amounts.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              year: row.year,
              gender: row.gender,
              amount: parseFloat(row.amount),
            }));
            setData(parsedData);
            console.log(parsedData);
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, []);

  // Define a color palette compatible with color-blind people
  const COLORS = {
    F: '#E69F00',
    M: '#0072B2'
  };

  // Function to format the Y-axis ticks to "k€"
  const formatYAxis = (tickItem) => {
    return `${(tickItem / 1000).toFixed(0)}k€`;
  };

  // Transform the data to be suitable for the stacked bar chart
  const transformedData = [];
  const years = [...new Set(data.map(item => item.year))];

  years.forEach(year => {
    const yearData = { year };
    data.forEach(item => {
      if (item.year === year) {
        yearData[item.gender] = item.amount;
      }
    });
    transformedData.push(yearData);
  });

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Total revenue per gender per year</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={transformedData}
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
          <Bar dataKey="F" stackId="a" fill={COLORS.F} name="Female" />
          <Bar dataKey="M" stackId="a" fill={COLORS.M} name="Male" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerGenderPerYear;
