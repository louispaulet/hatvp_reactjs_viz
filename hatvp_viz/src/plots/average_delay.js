import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const AverageDelay = ({ dataset }) => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch(`./datasets/average_publication_delay_${dataset}.csv`)
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
          // Convert average delays to integers
          obj['year'] = parseInt(obj['year'], 10);
          obj['average_publication_delay'] = parseInt(obj['average_publication_delay'], 10);
          return obj;
        });
        setData(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  return (
    <section className="App-section" id="surname_count">
      <h2>Average delay between posting and publishing</h2>
      <p>How many days pass, on average, between the date of posting and the date of publishing for a declaration. <br/>
      We observe a downwards trend, indicating that the data is being processed faster and faster.
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year"> <Label value={"Posting year"} angle={0} dy={20} /> </XAxis>
          <YAxis> <Label value={"average publication delay in days"} angle={270} dx={-20} /> </YAxis>
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px' }} />
          <Line type="monotone" dataKey="average_publication_delay" stroke="#5E8C31" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default AverageDelay;
