import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const SurnameCount = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./datasets/top_surnames.csv')
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n').filter(row => row.trim().length > 0); // Filter out empty rows
        const headers = rows[0].split(',');
        const data = rows.slice(1).map(row => {
          const values = row.split(',');
          let obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });
        setData(data);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, []);

  // Prepare data for the stacked bar chart
  const genderCounts = data.reduce((acc, cur) => {
    const { prenom, count, gender } = cur;
    if (!acc[prenom]) {
      acc[prenom] = { prenom };
    }
    acc[prenom][gender] = parseInt(count, 10);
    return acc;
  }, {});

  const chartData = Object.values(genderCounts);
  console.log(chartData)

  return (
    <section className="App-section" id="surname_count">
      <h2>Top 10 surnames in the dataset</h2>
      <p>Here is the bar chart showing the top 10 'prenom' (surnames) with respective number of occurrences. <br/>
      Notice how the overwhelming majority is male gendered.</p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="prenom"> <Label value={"Surname"} angle={0} dy={20} /> </XAxis>
          <YAxis> <Label value={"Count"} angle={270} dx={-20} /> </YAxis>
          <Tooltip />
          <Legend  verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px' }} />
          <Bar dataKey="male" stackId="a" fill="#4169e1" />
          <Bar dataKey="female" stackId="a" fill="#ff69b4" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default SurnameCount;
