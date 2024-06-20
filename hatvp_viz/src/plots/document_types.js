import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Cell } from 'recharts';

const DocumentTypes = ({ dataset }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`./datasets/document_type_count_${dataset}.csv`)
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
          obj['document_count'] = parseInt(obj['count'], 10);
          return obj;
        });
        // Sort data by document_count in decreasing order
        data.sort((a, b) => b.document_count - a.document_count);
        setData(data);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });
  }, [dataset]);

  // Define a color palette compatible with color-blind people
  const COLORS = ['#0072B2', '#D55E00', '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#CC79A7', '#999999'];

  return (
    <section className="App-section" id="surname_count">
      <h2>Document types</h2>
      <p>Document types explained: </p>
      <ul>
        <li><b>(DI)</b> Declaration of interests</li>
        <li><b>(DIM)</b> Declaration of substantial modification of interests</li>
        <li><b>(DIAM)</b> Declaration of substantial modification of interests and activities</li>
        <li><b>(DSP)</b> Declaration of assets</li>
        <li><b>(DSPM)</b> Declaration of substantial modification of assets</li>
        <li><b>(DIA)</b> Declaration of interests and activities</li>
        <li><b>(DSPFM)</b> Declaration of assets - end of mandate</li>
        <li><b>(Precision)</b> Assessment by the HATVP</li>
      </ul>
      <p> We can see that the datasets consists mostly of declaration of interests and their respective updates.  </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 30, bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number">
            <Label value={"Number of documents"} angle={0} position="insideBottom" offset={-5} dy={10} />
          </XAxis>
          <YAxis type="category" dataKey="document_type">
            <Label value={"Document type"} angle={270} position="center" dx={-50} />
          </YAxis>
          <Tooltip />
          
          <Bar dataKey="document_count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default DocumentTypes;
