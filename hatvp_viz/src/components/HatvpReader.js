import React, { useEffect, useState } from 'react';
import { parseString } from 'xml2js';
import './HatvpReader.css';
import './../App.css';

const HatvpReader = ({ url }) => {
   
    const [xmlData, setXmlData] = useState(null);

    useEffect(() => {
        if (!url) return; // Return early if URL is empty
        const fetchXmlData = async () => {
            try {
                const response = await fetch('https://corsproxy.io/?'+url);
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
        <table className="nested-table">
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
                                        <td className="key-cell"><strong>{key}</strong></td>
                                        <td className="value-cell">{obj.brutNet}</td>
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
                                <td className="key-cell"><strong>{key}</strong></td>
                                <td className="value-cell">{renderObject(value)}</td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr key={index}>
                                <td className="key-cell"><strong>{key}</strong></td>
                                <td className="value-cell">{value}</td>
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
        <div className="table-wrapper">
            <table className="nested-table">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {montants.map((montant, index) => (
                        <tr key={index}>
                            <td>{montant.annee}</td>
                            <td>{montant.montant}</td>
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
            <h3> Selected declaration content: </h3>
                {Object.entries(items).map(([key, value], index) => (
                    <div key={index} className="item-container">
                        <h3>{key}</h3>
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
        <div className="container">
            <div>
                {renderXmlData(xmlData)}
            </div>
        </div>
    );
};

export default HatvpReader;
