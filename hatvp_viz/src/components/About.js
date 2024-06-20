import React from 'react';
import './../App.css';

const About = () => {
  return (
    <section className="App-about" id="about">
      <h2>About our Project</h2>
      <p>
        Transparency Watch aims to provide insightful data visualizations that promote transparency and accountability in public life. By leveraging the HATVP datasets, we make complex data accessible and understandable to the public.
      </p>
      <p>
        In today's world, the availability of open data is crucial for fostering transparency, accountability, and an informed citizenry. Open data allows the public to scrutinize the activities of public officials, institutions, and policies, ensuring that they act in the best interests of society. Monitoring open data is essential for several reasons:
      </p>
      <ul>
        <li>
          <strong>Promoting Gender Equality:</strong> The Gender Equality dashboard reveals significant imbalances between men and women in public representation. For instance, a bar chart displaying the top 10 surnames shows a stark dominance of male-gendered names, indicating an overwhelming majority of male representatives. The total gender ratio, depicted in a pie chart, further highlights this imbalance, with males constituting 64.69% of the dataset. Another example from the dashboard shows the distribution of gender across different mandate types, underscoring the variations in gender ratios and highlighting areas for improvement.
        </li>
        <li>
          <strong>Understanding Geographic Disparities:</strong> A map showing the percentage of women in each French department illustrates the geographic disparities in gender representation. Departments range from male-heavy to more balanced gender ratios, yet no department has a significantly higher percentage of women. This geographic visualization helps identify regions where gender equality efforts need more focus.
        </li>
        <li>
          <strong>Tracking Document Publications:</strong> The Publication Rate dashboard provides a detailed analysis of the posting and publication rates of HATVP declarations. By showing the number of declarations posted and published each month, it reveals trends and delays in the publication process. For example, there is a noticeable peak in both posting and publication activities at certain times, indicating periods of increased transparency efforts or reporting deadlines. The average delay between posting and publishing declarations, depicted in a line chart, shows a downward trend over the years, indicating that the data is being processed faster, enhancing the timeliness of information availability.
        </li>
        <li>
          <strong>Analyzing Document Types and Regional Differences:</strong> A bar chart categorizes the different types of documents submitted, such as Declarations of Interests (DI) and Declarations of Assets (DSP). This helps in understanding the nature and volume of information being disclosed. Another map shows the number of declarations published per French department, highlighting regional differences in transparency practices. Notably, the "empty diagonal" visible on the map points to areas with lower publication rates, which may warrant further investigation.
        </li>
      </ul>
      <p>
        By monitoring and analyzing open data, Transparency Watch aims to shine a light on these critical areas, fostering a more transparent and accountable society. Through our visualizations, we strive to make complex data accessible, enabling citizens to engage with and understand the workings of their public institutions.
      </p>
    </section>
  );
}

export default About;
 