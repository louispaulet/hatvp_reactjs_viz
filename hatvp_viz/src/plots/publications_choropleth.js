import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const PublicationsChoropleth = ({dataset}) => {
  const [data, setData] = useState([]);
  const [geoData, setGeoData] = useState(null);
  const svgRef = useRef();

  useEffect(() => {
    // Load CSV dataset
    fetch(`./datasets/publications_per_departement_${dataset}.csv`)
      .then(response => response.text())
      .then(text => {
        const rows = d3.csvParse(text);
        setData(rows);
      })
      .catch(error => {
        console.error('Error loading the CSV file:', error);
      });

    // Load (local) GeoJSON dataset
    //source: 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson')
    fetch('./datasets/departements-version-simplifiee.geojson')
      .then(response => response.json())
      .then(json => {
        setGeoData(json);
      })
      .catch(error => {
        console.error('Error loading the GeoJSON file:', error);
      });
  }, [dataset]);

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

  // Create two separate color scales
  const colorScaleMen = d3.scaleLinear()
    .domain([50, 0]) // More men
    .range(["#add8e6", "#0000ff"]); // Intense blue to light blue

  const colorScaleWomen = d3.scaleLinear()
    .domain([50, 100]) // More women
    .range(["#ffb6c1", "#ff1493"]); // Intense pink to light pink

  const geoJsonFeatures = geoData.features;
  const mergedData = geoJsonFeatures.map(feature => {
    const depData = data.find(dep => dep.departement === feature.properties.code);
    feature.properties.count = depData ? +depData.count : 0;
    return feature;
  });

  svg.selectAll('path')
    .data(mergedData)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', d => d.properties.count >= 50 
                       ? colorScaleWomen(d.properties.count) 
                       : colorScaleMen(d.properties.count))
    .attr('stroke', '#fff')
    .attr('stroke-width', 0.5)
    .append('title')
    .text(d => `${d.properties.nom}: ${parseInt(d.properties.count)} publications`);


  // Add a legend
  const legendWidth = 300;
  const legendHeight = 10;

  const legend = svg.append('g')
    .attr('transform', `translate(${width - legendWidth - 20},${height - 30})`);

  // Create a combined legend scale
  const legendScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, legendWidth]);

  const legendAxis = d3.axisBottom(legendScale)
    .ticks(5)
    .tickFormat(d => d + '%');

  // Create a gradient for the legend
  const gradient = svg.append("defs")
    .append("linearGradient")
    .attr("id", "legend-gradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#0000ff");

  gradient.append("stop")
    .attr("offset", "25%")
    .attr("stop-color", "#add8e6");

  gradient.append("stop")
    .attr("offset", "50%")
    .attr("stop-color", "#fff");

  gradient.append("stop")
    .attr("offset", "75%")
    .attr("stop-color", "#ffb6c1");

  gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ff1493");

  legend.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', legendWidth)
    .attr('height', legendHeight)
    .style('fill', 'url(#legend-gradient)');

  legend.append('g')
    .attr('transform', `translate(0,${legendHeight})`)
    .call(legendAxis);
};


  return (
  <section className="App-section" id="gender_choropleth">
    <h2>Number of publications per Department</h2>
    <p>
      This map shows the number of declarations published in each French department. <br/>
      Notice how the <a href="https://en.wikipedia.org/wiki/Empty_diagonal" target="_blank" rel="noopener noreferrer">empty diagonal</a> is visible.
    </p>
    <svg ref={svgRef} width={800} height={600}></svg>
  </section>
);

};

export default PublicationsChoropleth;
