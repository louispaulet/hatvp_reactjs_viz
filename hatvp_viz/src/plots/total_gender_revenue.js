import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Papa from 'papaparse';

const TotalGenderRevenue = ({dataset}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/total_declared_value_per_gender_all_amounts_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data
              .filter(entry => entry.amount && entry.gender)  // Filter out any incomplete rows
              .map(entry => ({
                ...entry,
                amount: parseFloat(entry.amount),
                gender: entry.gender === 'F' ? 'Women' : entry.gender === 'M' ? 'Men' : entry.gender
              }));

            // Calculate total amount
            const total = data.reduce((sum, entry) => sum + entry.amount, 0);

            // Add percentage to each entry
            const dataWithPercentage = data.map(entry => ({
              ...entry,
              percentage: ((entry.amount / total) * 100).toFixed(2)
            }));

            setData(dataWithPercentage);
          },
          error: (error) => {
            console.error('Error parsing the CSV file:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  const COLORS = ['#ff69b4', '#4169e1'];

  // Custom tooltip to show values in M€ (millions of euros)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const valueInMillions = (value / 1e6).toFixed(2);
      return (
        <div className="bg-white p-2 shadow rounded text-sm">
          <p>{`${name} amount: ${valueInMillions} M€`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label to show percentage
  const renderLabel = ({ name, percentage }) => `${name}: ${percentage}%`;

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Total revenue reported by gender</h2>
      <p className="text-gray-700 mb-4">We see that men report the majority of all revenue.</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="gender"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </section>
  );
}

export default TotalGenderRevenue;
