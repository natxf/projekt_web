import React, { useState, useEffect } from 'react';
import { fetchMYear } from '../services/api';

const MYearFilter = ({ onFilterChange }) => {
    const [mYears, setYears] = useState([]);
    const [selectedMYear, setSelectedMYear] = useState('');

    useEffect(() => {
        fetchMYear()
            .then((response) => {
                console.log('Fetched years:', response);
                const years = response.data ? response.data.map((item) => item.m_year) : [];

                console.log('Extracted years:', years);
                setYears(years);
            })
            .catch((error) => {
                console.error('Error fetching missing years:', error);
            });
    }, []);

    const handleSelect = (event) => {
        const mYear = event.target.value;
        setSelectedMYear(mYear);
        onFilterChange(mYear);
    };

    return (
        <div>
            <h3>Rok zaginięcia</h3>
            <label htmlFor="yearFilter"></label>
            <select
                id="yearFilter"
                value={selectedMYear}
                onChange={handleSelect}
                style={{ padding: '10px', fontSize: '16px' }}
            >
                <option value="">Brak filtru</option>
                {mYears.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default MYearFilter;
