import React, { useEffect, useState } from 'react';
import { parseString } from 'xml2js';

const HatvpReader = ({ url }) => {
    const [xmlData, setXmlData] = useState(null);

    useEffect(() => {
        if (!url) return; // Return early if URL is empty
        const fetchXmlData = async () => {
            try {
                const response = await fetch('https://corsproxy.io/?' + url);
                const text = await response.text();
                parseString(text, { explicitArray: false, mergeAttrs: true }, (err, result) => {
                    if (err) {
                        console.error('Error parsing XML:', err);
                    } else {
                        setXmlData(result.declaration); // Directly access the declaration node
                    }
                });
            } catch (error) {
                console.error('Error fetching XML:', error);
            }
        };

        fetchXmlData();
    }, [url]);

    const renderObject = (obj) => {
        return (
            <table className="table-auto w-full border-collapse bg-white">
                <tbody>
                    {Object.entries(obj).map(([key, value], index) => {
                        if (key === 'items') {
                            // Directly render the children of the "items" node
                            if (Array.isArray(value)) {
                                return value.map((item, subIndex) => (
                                    <React.Fragment key={`${index}-${subIndex}`}>
                                        {renderObject(item)}
                                    </React.Fragment>
                                ));
                            } else {
                                return (
                                    <React.Fragment key={index}>
                                        {renderObject(value)}
                                    </React.Fragment>
                                );
                            }
                        } else if (key === 'montant' && Array.isArray(value)) {
                            return (
                                <React.Fragment key={index}>
                                    {obj.brutNet && (
                                        <tr>
                                            <td className="border px-4 py-2 font-bold">{key}</td>
                                            <td className="border px-4 py-2">{obj.brutNet}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <td colSpan="2">{renderMontant(value)}</td>
                                    </tr>
                                </React.Fragment>
                            );
                        } else if (typeof value === 'object' && value !== null) {
                            return (
                                <tr key={index}>
                                    <td className="border px-4 py-2 font-bold">{key}</td>
                                    <td className="border px-4 py-2">{renderObject(value)}</td>
                                </tr>
                            );
                        } else {
                            return (
                                <tr key={index}>
                                    <td className="border px-4 py-2 font-bold">{key}</td>
                                    <td className="border px-4 py-2">{value}</td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        );
    };

    const renderMontant = (montants) => {
        return (
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse bg-white">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Year</th>
                            <th className="border px-4 py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {montants.map((montant, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{montant.annee}</td>
                                <td className="border px-4 py-2">{montant.montant}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderItems = (items) => {
        return (
            <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Selected declaration content:</h3>
                {Object.entries(items).map(([key, value], index) => (
                    <div key={index} className="mb-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{key}</h3>
                        {typeof value === 'object' && value !== null ? renderObject(value) : value}
                    </div>
                ))}
            </div>
        );
    };

    const renderXmlData = (data) => {
        if (!data) return null;
        return renderItems(data);
    };

    return (
        <div className="container mx-auto p-4">
            <div>
                {renderXmlData(xmlData)}
            </div>
        </div>
    );
};

export default HatvpReader;