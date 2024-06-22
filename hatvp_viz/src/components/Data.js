import React from 'react';

const Data = () => {
  return (
    <section className="bg-gradient-to-br from-purple-200 to-blue-400 py-12 px-4 sm:px-6 lg:px-8" id="data">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center justify-center">
          About the data <span className="ml-2">📊</span>
        </h2>
        
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            What is HATVP? <span className="ml-2">🛈</span>
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The Haute Autorité pour la transparence de la vie publique (HATVP) is an independent administrative authority in France, tasked with promoting transparency in public life. It ensures that public officials and representatives declare their interests and financial involvements, thereby preventing conflicts of interest and fostering trust in public institutions. You can learn more about HATVP on their <a className="text-indigo-600 hover:underline" href="https://en.wikipedia.org/wiki/Haute_Autorité_pour_la_Transparence_de_la_Vie_Publique" target="_blank" rel="noopener noreferrer">Wikipedia page</a> or by visiting the <a className="text-indigo-600 hover:underline" href="https://www.hatvp.fr/" target="_blank" rel="noopener noreferrer">HATVP official website</a>.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            Declarations of Interest by Public Representatives <span className="ml-2">📄</span>
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            The HATVP provides open data sets in CSV and XML formats containing the declarations of interest submitted by public representatives. These declarations include various interests, activities, and financial involvements that these individuals are engaged in. The purpose of these declarations is to ensure transparency and prevent conflicts of interest among public representatives. By making this data publicly available, HATVP allows citizens to scrutinize the activities and interests of their representatives, thereby fostering a culture of accountability.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can access the HATVP open data page with links to CSV and XML exports of declarations here: 
            <a className="text-indigo-600 hover:underline" href="https://www.hatvp.fr/consulter-les-declarations/" target="_blank" rel="noopener noreferrer"> HATVP open data page for declarations of interest</a>.
          </p>
        </section>
        
        <section className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            Declarations by Lobbying Organizations <span className="ml-2">🏛️</span>
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            In addition to the declarations by public representatives, HATVP also collects and publishes data on lobbying activities. The data includes JSON files with declarations submitted by lobbying organizations, detailing their expenditures and the issues they are lobbying for or against. This transparency in lobbying activities allows the public to understand the influence of various organizations on public policy and decision-making. By providing access to this data, HATVP aims to ensure that lobbying practices are conducted openly and ethically.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can access the HATVP open data page with links to JSON files of lobbying organizations' declarations here: 
            <a className="text-indigo-600 hover:underline" href="https://www.hatvp.fr/open-data-repertoire/" target="_blank" rel="noopener noreferrer"> HATVP open data page for lobbying declarations</a>.
          </p>
        </section>

        <section>
          <h3 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            Third-Party Data Archiving and Backup <span className="ml-2">💾</span>
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            To ensure the longevity and accessibility of the HATVP data, a Google Cloud Platform (GCP) function has been created to archive and update datasets from the HATVP website to a HuggingFace repository. This includes regular backups of both the CSV and XML files from the HATVP declarations.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            You can access these archived datasets through the following links:
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-4">
            <li><a className="text-indigo-600 hover:underline" href="https://huggingface.co/datasets/the-french-artist/hatvp_declaration_list_archive" target="_blank" rel="noopener noreferrer">CSV file from HATVP declarations</a></li>
            <li><a className="text-indigo-600 hover:underline" href="https://huggingface.co/datasets/the-french-artist/hatvp_declaration_content_archive" target="_blank" rel="noopener noreferrer">XML file from HATVP declarations</a></li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            The importance of third-party backups cannot be overstated. By making these datasets available on multiple platforms, we ensure that the data remains accessible even if the original source becomes unavailable. This redundancy protects against data loss and promotes transparency and accountability by ensuring that public data remains open and available for analysis and scrutiny by anyone interested.
          </p>
        </section>
      </div>
    </section>
  );
}

export default Data;
