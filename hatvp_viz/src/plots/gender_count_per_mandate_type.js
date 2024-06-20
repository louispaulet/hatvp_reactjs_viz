import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const GenderCountPerMandateType = ({dataset}) => {
  const [data, setData] = useState([]);
  const [viewMode, setViewMode] = useState('percentage'); // 'absolute' or 'percentage'

  useEffect(() => {
    fetch(`./datasets/gender_ratio_per_type_mandat_${dataset}.csv`)
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
        console.log(data);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  const handleToggleChange = (event) => {
    setViewMode(event.target.value);
  };

  const transformDataToPercentage = (data) => {
    return data.map(item => {
      const femaleCount = parseInt(item.female_count);
      const maleCount = parseInt(item.male_count);
      const totalCount = femaleCount + maleCount;
      return {
        ...item,
        female_count: ((femaleCount / totalCount) * 100).toFixed(2),
        male_count: ((maleCount / totalCount) * 100).toFixed(2)
      };
    });
  };

  const sortDataByWomenCount = (data) => {
    return data.sort((a, b) => b.female_count - a.female_count);
  };

  const sortDataByWomenPercentage = (data) => {
    return data.sort((a, b) => b.female_count - a.female_count);
  };

  let displayedData = viewMode === 'percentage' ? transformDataToPercentage(data) : data;
  displayedData = viewMode === 'percentage' ? sortDataByWomenPercentage(displayedData) : sortDataByWomenCount(displayedData);

  return (
    <section className="App-section" id="surname_count">
      <h2>Mandate type</h2>
      <p>We show that the gender ratio is different for each mandate type.<br/>
      ⚠️ The "mandate type" order changes to always sort by decreasing women counts or percentages.</p>
      <div>
        <label>
          <input
            type="radio"
            value="percentage"
            checked={viewMode === 'percentage'}
            onChange={handleToggleChange}
          />
          Percentage
        </label>
        <label>
          <input
            type="radio"
            value="absolute"
            checked={viewMode === 'absolute'}
            onChange={handleToggleChange}
          />
          Absolute Values
        </label>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={displayedData}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type_mandat">
            <Label value="Mandate type" angle={0} dy={20} />
          </XAxis>
          <YAxis>
            <Label value="Count" angle={270} dx={-30} />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '30px' }} />
          <Bar dataKey="female_count" stackId="a" fill="#ff69b4" name="Women count" />
          <Bar dataKey="male_count" stackId="a" fill="#4169e1" name="Men count" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default GenderCountPerMandateType;
