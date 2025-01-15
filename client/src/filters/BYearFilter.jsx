import React, { useState, useEffect } from 'react';
import { fetchBYear } from '../services/api';

const BYearFilter = ({ onFilterChange }) => {
    const [bYears, setYears] = useState([]);
    const [selectedBYear, setSelectedBYear] = useState('');

    useEffect(() => {
        fetchBYear()
            .then((response) => {
                console.log('Fetched years:', response);
                const years = response.data ? response.data.map((item) => item.b_year) : [];

                console.log('Extracted years:', years);
                setYears(years);
            })
            .catch((error) => {
                console.error('Error fetching missing years:', error);
            });
    }, []);

    const handleSelect = (event) => {
        const mYear = event.target.value;
        setSelectedBYear(mYear);
        onFilterChange(mYear);
    };

    return (
        <div>
            <h3>Rok urodzenia: </h3>
            <label htmlFor="yearFilter"></label>
            <select
                id="yearFilter"
                value={selectedBYear}
                onChange={handleSelect}
                style={{ padding: '10px', fontSize: '16px' }}
            >
                <option value="">Brak filtru</option>
                {bYears.map((year, index) => (
                    <option key={index} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BYearFilter;
