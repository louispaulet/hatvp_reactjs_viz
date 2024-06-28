import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerAgeRange = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/revenue_per_pers_per_age_range_per_year_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.reduce((acc, row) => {
              const year = row.year;
              const ageBin = row.declarant_age_bin;
              const revenue = parseFloat(row.revenue_per_pers);

              if (!acc[year]) {
                acc[year] = { year };
              }

              acc[year][ageBin] = revenue;
              return acc;
            }, {});

            setData(Object.values(parsedData));
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  // Define a color palette compatible with color-blind people
  const COLORS = {
    '17-30': '#0072B2',
    '30-40': '#009E73',
    '40-50': '#D55E00',
    '50-60': '#CC79A7',
    '60-70': '#F0E442',
    '70+': '#56B4E9',
  };

  // Function to format the Y-axis ticks to "k€"
  const formatYAxis = (tickItem) => {
    return `${(tickItem / 1000).toFixed(0)}k€`;
  };

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Revenue per person and per age range per year</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
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
            <Label value="Revenue per pers." angle={270} position="center" offset={-50} dx={-35} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend />
          {Object.keys(COLORS).map((ageBin) => (
            <Area key={ageBin} type="monotone" dataKey={ageBin} stackId="1" stroke={COLORS[ageBin]} fill={COLORS[ageBin]} name={`Age ${ageBin}`} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerAgeRange;
