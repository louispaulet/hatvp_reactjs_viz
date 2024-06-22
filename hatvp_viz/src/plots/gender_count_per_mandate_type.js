import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const GenderCountPerMandateType = ({ dataset }) => {
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
    <section className="mb-6 p-4 bg-white">
      <h2 className="text-xl font-extrabold text-gray-900 mb-4">Mandate type</h2>
      <p className="text-gray-700 mb-4">
        We show that the gender ratio is different for each mandate type.<br />
        ⚠️ The "mandate type" order changes to always sort by decreasing women counts or percentages.
      </p>
      <div className="mb-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            value="percentage"
            checked={viewMode === 'percentage'}
            onChange={handleToggleChange}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2 text-gray-800">Percentage</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="absolute"
            checked={viewMode === 'absolute'}
            onChange={handleToggleChange}
            className="form-radio text-indigo-600"
          />
          <span className="ml-2 text-gray-800">Absolute Values</span>
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
            <Label value={viewMode === 'percentage' ? "Percentage" : "Count"} angle={270} dx={-30} />
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