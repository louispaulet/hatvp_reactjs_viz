import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerMandateCategoryPerYear = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/revenue_per_mandate_category_per_year_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.reduce((acc, row) => {
              const year = row.year;
              const mandate_category = row.mandate_category;
              const revenue = parseFloat(row.revenue);

              if (!acc[year]) {
                acc[year] = { year };
              }

              acc[year][mandate_category] = revenue;
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
    'COLLECTIVITE A STATUT PARTICULIER': '#0072B2',
    'ELU DEPARTEMENTAL': '#009E73',
    'ELU REGIONAL': '#D55E00',
    'MAIRE OU ADJOINT MUNICIPAL': '#CC79A7',
    'MEMBRE D EPCI': '#F0E442'
  };

  // Function to format the Y-axis ticks to "k€"
  const formatYAxis = (tickItem) => {
    return `${(tickItem / 1000000).toFixed(0)}M€`;
  };

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Revenue per mandate type and per year</h2>
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
            <Label value="Revenue" angle={270} position="center" offset={-50} dx={-35} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend />
          {Object.keys(COLORS).map((mandate_category) => (
            <Area key={mandate_category} type="monotone" dataKey={mandate_category} stackId="1" stroke={COLORS[mandate_category]} fill={COLORS[mandate_category]} name={`${mandate_category}`} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerMandateCategoryPerYear;
