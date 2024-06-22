import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const TotalGenderRatio = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/total_gender_ratio_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').filter(row => row.trim().length > 0); // Filter out empty rows
        const headers = rows[0].split(',');
        const data = rows.slice(1).map(row => {
          const values = row.split(',');
          let obj = {};
          headers.forEach((header, index) => {
            obj[header] = header === 'count' ? parseInt(values[index], 10) : values[index];
          });
          return obj;
        });

        // Calculate total count
        const total = data.reduce((sum, entry) => sum + entry.count, 0);

        // Add percentage to each entry
        const dataWithPercentage = data.map(entry => ({
          ...entry,
          percentage: ((entry.count / total) * 100).toFixed(2)
        }));

        setData(dataWithPercentage);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  const COLORS = ['#4169e1', '#ff69b4'];

  // Custom tooltip to show only absolute values
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      return (
        <div className="bg-white p-2 shadow rounded text-sm">
          <p>{`${name} count: ${value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom label to show percentage
  const renderLabel = ({ name, percentage }) => `${name}: ${percentage}%`;

  return (
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Total Gender Ratio</h2>
      <p className="text-gray-700 mb-4">The pie chart below shows the total gender ratio over the complete dataset.</p>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
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

export default TotalGenderRatio;