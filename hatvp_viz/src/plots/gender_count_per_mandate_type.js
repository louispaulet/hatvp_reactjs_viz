import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const GenderCountPerMandateType = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./datasets/gender_ratio_per_type_mandat.csv')
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
        console.log(data)
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, []);

data.sort((a, b) => b.female_count - a.female_count);


  return (
    <section className="App-section" id="surname_count">
      <h2>Mandate type</h2>
      <p> We show that the gender ratio is different for each mandate type. <br/>
      The president is a man. </p>
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
          <XAxis dataKey="type_mandat"> <Label value={"Mandate type"} angle={0} dy={20} /> </XAxis>
          <YAxis> <Label value={"Count"} angle={270} dx={-30} /> </YAxis>
          <Tooltip />
          <Legend  verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px' }} />
          <Bar dataKey="female_count" stackId="a" fill="#ff69b4" name="Women count" />
          <Bar dataKey="male_count" stackId="a" fill="#4169e1" name="Men count" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default GenderCountPerMandateType;
