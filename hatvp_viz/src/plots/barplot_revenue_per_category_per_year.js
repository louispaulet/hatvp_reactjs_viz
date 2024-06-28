import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import Papa from 'papaparse';

const RevenuePerCategoryPerYear = ({dataset}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/revenue/total_revenue_per_revenue_category_per_year_all_amounts_${dataset}.csv`)
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
          },
        });
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

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
            <Label value="Total Amount" angle={270} position="insideLeft" offset={-5} dx={-10} />
          </YAxis>
          <Tooltip formatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
          <Legend />
          <Area type="monotone" dataKey="job_revenue" stackId="1" stroke={COLORS.job_revenue} fill={COLORS.job_revenue} name="Job Revenue" />
          <Area type="monotone" dataKey="elective_revenue" stackId="1" stroke={COLORS.elective_revenue} fill={COLORS.elective_revenue} name="Elective Revenue" />
          <Area type="monotone" dataKey="executive_revenue" stackId="1" stroke={COLORS.executive_revenue} fill={COLORS.executive_revenue} name="Executive Revenue" />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export default RevenuePerCategoryPerYear;
