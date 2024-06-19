import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const GenderChoropleth = () => {
  const [data, setData] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    // Load CSV dataset
    fetch('./datasets/women_percentage_per_departement.csv')
      .then(response => response.text())
      .then(text => {
        const rows = d3.csvParse(text);
        setData(rows);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });

    // Load GeoJSON dataset
    fetch('https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson')
      .then(response => response.json())
      .then(json => {
        setGeoData(json);
      })
      .catch(error => {
        console.error('Error loading the GeoJSON file:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0 && geoData) {
      drawChoropleth();
    }
  }, [data, geoData]);

  const drawChoropleth = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawing

    const width = 800;
    const height = 600;

    const projection = d3.geoConicConformal()
      .center([2.454071, 46.279229])
      .scale(2600)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const colorScale = d3.scaleSequential(d3.interpolateCool)
      .domain([d3.min(data, d => +d.women_perc), d3.max(data, d => +d.women_perc)]);

    const geoJsonFeatures = geoData.features;
    const mergedData = geoJsonFeatures.map(feature => {
      const depData = data.find(dep => dep.departement === feature.properties.code);
      feature.properties.women_perc = depData ? +depData.women_perc : 0;
      return feature;
    });

    svg.selectAll('path')
      .data(mergedData)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => colorScale(d.properties.women_perc))
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .append('title')
      .text(d => `${d.properties.nom}: ${d.properties.women_perc}%`);

    // Add a legend
    const legendWidth = 300;
    const legendHeight = 10;

    const legend = svg.append('g')
      .attr('transform', `translate(${width - legendWidth - 20},${height - 30})`);

    const legendScale = d3.scaleLinear()
      .domain(colorScale.domain())
      .range([0, legendWidth]);

    const legendAxis = d3.axisBottom(legendScale)
      .ticks(5)
      .tickFormat(d => d + '%');

    legend.selectAll('rect')
      .data(d3.range(legendWidth), d => d)
      .enter()
      .append('rect')
      .attr('x', d => d)
      .attr('y', 0)
      .attr('width', 1)
      .attr('height', legendHeight)
      .attr('fill', d => colorScale(legendScale.invert(d)));

    legend.append('g')
      .attr('transform', `translate(0,${legendHeight})`)
      .call(legendAxis);
  };

  return (
    <section className="App-section" id="gender_choropleth">
      <h2>Women Percentage by Department</h2>
      <p>This map shows the percentage of women in each French department.</p>
      <svg ref={svgRef} width={800} height={600}></svg>
    </section>
  );
};

export default GenderChoropleth;
