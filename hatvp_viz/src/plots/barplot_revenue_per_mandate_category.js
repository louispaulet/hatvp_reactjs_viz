import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell } from 'recharts';
import Papa from 'papaparse';

const RevenuePerMandateCategory = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/revenue_per_mandate_category_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data.map(row => ({
              mandate_category: row.mandate_category,
              revenue: parseFloat(row.revenue),
            })).sort((a, b) => a.revenue - b.revenue); // Sort data in ascending order
            setData(parsedData);
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  // Define a color palette compatible with color-blind people
  const COLORS = ['#0072B2', '#D55E00', '#E69F00'];

  // Function to format the Y-axis ticks to "M€"
  const formatYAxis = (tickItem) => {
    return `${(tickItem / 1000000).toFixed(0)}M€`;
  };

  // Function to format the tooltip to show values in "M€"
  const formatTooltip = (value) => {
    return `${(value / 1000000).toFixed(2)}M€`;
  };

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Total revenue per source</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="horizontal"
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" tickFormatter={formatYAxis}>
            <Label value="Total revenue" angle={270} position="insideLeft" offset={-5} dx={-10} />
          </YAxis>
          <XAxis type="category" dataKey="mandate_category" tick={{ fontSize: "smaller" }}  >
            <Label value="Mandate type" angle={0} position="insideBottom" dy={20} />
          </XAxis>
          <Tooltip formatter={formatTooltip} />
          <Bar dataKey="revenue">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerMandateCategory;
