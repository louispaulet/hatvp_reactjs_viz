import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerAgeRange = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/revenue_per_pers_per_age_range_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              year: row.declarant_age_bin,
              revenue_per_pers: parseFloat(row.revenue_per_pers)
            })).reverse(); // Reverse the order to have age ranges increasing from the bottom up
            setData(parsedData);
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  // Define a color palette compatible with color-blind people
  const COLORS = {
    revenue_per_pers: '#0072B2',
  };

  // Function to format the X-axis ticks to "k€"
  const formatXAxis = (tickItem) => {
    return `${(tickItem / 1000).toFixed(0)}k€`;
  };

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Revenue per person and per age range</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tickFormatter={formatXAxis}>
            <Label value="Revenue per pers." position="insideBottom" dy={10} />
          </XAxis>
          <YAxis type="category" dataKey="year" interval={0}>
            <Label value="Age range" angle={270} position="insideLeft" offset={-5} dx={-10} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend formatter={() => "Revenue per pers. per age range"} />
          <Bar dataKey="revenue_per_pers" stackId="a" fill={COLORS.revenue_per_pers} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerAgeRange;
