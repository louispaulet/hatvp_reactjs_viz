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
            obj[header.trim()] = values[index].trim();
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
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Posting and Publications per month</h2>
      <p className="text-gray-700 mb-4">
        How many declarations where posted/published each month. <br/>
        We see delays between posting and publishing when the number of submissions is exceptionally high.
      </p>
      <div className="mb-4">
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            id="both"
            name="displayOption"
            value="both"
            checked={displayOption === 'both'}
            onChange={() => setDisplayOption('both')}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2 text-gray-800">Show both</span>
        </label>
        <label className="inline-flex items-center mr-6">
          <input
            type="radio"
            id="posting"
            name="displayOption"
            value="posting"
            checked={displayOption === 'posting'}
            onChange={() => setDisplayOption('posting')}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2 text-gray-800">Only posting dates</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            id="publication"
            name="displayOption"
            value="publication"
            checked={displayOption === 'publication'}
            onChange={() => setDisplayOption('publication')}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2 text-gray-800">Only publication dates</span>
        </label>
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
          <XAxis dataKey="date"><Label value="Date" angle={0} dy={20} /></XAxis>
          <YAxis><Label value="Number of Declarations" angle={270} dx={-20} /></YAxis>
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