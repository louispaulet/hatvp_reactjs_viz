import React from 'react';

const About = () => {
  return (
    <section className="bg-gradient-to-br from-green-200 to-blue-200 py-12 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">About our Project</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Transparency Watch aims to provide insightful data visualizations that promote transparency and accountability in public life. By leveraging the HATVP datasets, we make complex data accessible and understandable to the public.
        </p>
        <p className="text-gray-700 mb-8 leading-relaxed">
          In today's world, the availability of open data is crucial for fostering transparency, accountability, and an informed citizenry. Open data allows the public to scrutinize the activities of public officials, institutions, and policies, ensuring that they act in the best interests of society. Monitoring open data is essential for several reasons, highlighted in the following 4 points paired with insights.  
        </p>
        
        <h3 className="text-3xl font-extrabold text-gray-900 mb-8">Examples of insights from current dashboards</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">👫</span>
              <h3 className="text-xl font-bold text-gray-900">Promoting Gender Equality</h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Gender Equality dashboard reveals significant imbalances between men and women in public representation. For instance, a bar chart displaying the top 10 surnames shows a stark dominance of male-gendered names, indicating an overwhelming majority of male representatives.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The total gender ratio, depicted in a pie chart, further highlights this imbalance, with males constituting 64.69% of the dataset. Another example from the dashboard shows the distribution of gender across different mandate types, underscoring the variations in gender ratios and highlighting areas for improvement.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">🌍</span>
              <h3 className="text-xl font-bold text-gray-900">Understanding Geographic Disparities</h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A map showing the percentage of women in each French department illustrates the geographic disparities in gender representation. Departments range from male-heavy to more balanced gender ratios, yet no department has a significantly higher percentage of women.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              This geographic visualization helps identify regions where gender equality efforts need more focus.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">📄</span>
              <h3 className="text-xl font-bold text-gray-900">Tracking Document Publications</h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The Publication Rate dashboard provides a detailed analysis of the posting and publication rates of HATVP declarations. By showing the number of declarations posted and published each month, it reveals trends and delays in the publication process.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              For example, there is a noticeable peak in both posting and publication activities at certain times, indicating periods of increased transparency efforts or reporting deadlines.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The average delay between posting and publishing declarations, depicted in a line chart, shows a downward trend over the years, indicating that the data is being processed faster, enhancing the timeliness of information availability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-2">🗂️</span>
              <h3 className="text-xl font-bold text-gray-900">Analyzing Document Types and Regional Differences</h3>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A bar chart categorizes the different types of documents submitted, such as Declarations of Interests (DI) and Declarations of Assets (DSP). This helps in understanding the nature and volume of information being disclosed.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Another map shows the number of declarations published per French department, highlighting regional differences in transparency practices.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Notably, the "empty diagonal" visible on the map points to areas with lower publication rates, which may warrant further investigation.
            </p>
          </div>
        </div>

        <p className="text-gray-700 mt-6 leading-relaxed">
          By monitoring and analyzing open data, Transparency Watch aims to shine a light on these critical areas, fostering a more transparent and accountable society. Through our visualizations, we strive to make complex data accessible, enabling citizens to engage with and understand the workings of their public institutions.
        </p>
      </div>
    </section>
  );
}

export default About;
