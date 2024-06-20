import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const DeclarationsPerDateCount = ({ dataset }) => {
  const [data, setData] = useState([]);
  const [displayOption, setDisplayOption] = useState('both');

  useEffect(() => {
    fetch(`./datasets/publications_per_month_${dataset}.csv`)
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
          // Convert counts to integers
          obj['date_publication_count'] = parseInt(obj['date_publication_count'], 10);
          obj['date_depot_count'] = parseInt(obj['date_depot_count'], 10);
          return obj;
        });
        setData(data);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  return (
    <section className="App-section" id="surname_count">
      <h2>Posting and Publications per month</h2>
      <p>How many declarations where posted/published each month. </p>
      <div>
        <input
          type="radio"
          id="both"
          name="displayOption"
          value="both"
          checked={displayOption === 'both'}
          onChange={() => setDisplayOption('both')}
        />
        <label htmlFor="both">Show both</label>

        <input
          type="radio"
          id="posting"
          name="displayOption"
          value="posting"
          checked={displayOption === 'posting'}
          onChange={() => setDisplayOption('posting')}
        />
        <label htmlFor="posting">Only posting dates</label>

        <input
          type="radio"
          id="publication"
          name="displayOption"
          value="publication"
          checked={displayOption === 'publication'}
          onChange={() => setDisplayOption('publication')}
        />
        <label htmlFor="publication">Only publication dates</label>
      </div>
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
          <XAxis dataKey="date"> <Label value={"date"} angle={0} dy={20} /> </XAxis>
          <YAxis> <Label value={"count"} angle={270} dx={-20} /> </YAxis>
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px' }} />
          {(displayOption === 'both' || displayOption === 'publication') && (
            <Line type="monotone" dataKey="date_publication_count" stroke="#5E8C31" />
          )}
          {(displayOption === 'both' || displayOption === 'posting') && (
            <Line type="monotone" dataKey="date_depot_count" stroke="#AAAAAA" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}

export default DeclarationsPerDateCount;
