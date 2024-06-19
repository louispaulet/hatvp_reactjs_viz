import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const TotalGenderRatio = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./datasets/total_gender_ratio.csv')
      .then(response => response.text())
      .then(text => {
        const rows = text.split('\n');
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

  return (
    <section className="App-section" id="surname_count">
      <h2>TODO</h2>
      <p>TODO <br/>
      TODO</p>
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
          <XAxis dataKey="gender"> <Label value={"gender"} angle={0} dy={20} /> </XAxis>
          <YAxis dataKey="count"> <Label value={"Count"} angle={270} dx={-20} /> </YAxis>
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default TotalGenderRatio;
