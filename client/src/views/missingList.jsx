import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import VoivFilterMenu from '../filters/VoivFilterMenu';
import SexFilterMenu from '../filters/SexFilterMenu';
import MYearFilter from '../filters/MYearFilter';
import BYearFilter from '../filters/BYearFilter';
import SearchPerson from './SearchPerson';
import '../css/list.css';


function MissingList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        voiv: '',
        sex: '',
        m_year: '',
        b_year: ''
    });

    useEffect(() => {
        fetchData()
            .then((response) => {
                console.log('Data received:', response.data);
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const applyFilters = (updatedFilters) => {
        let filtered = [...data];

        if (updatedFilters.voiv) {
            filtered = filtered.filter((item) => item.voiv === updatedFilters.voiv);
        }

        if (updatedFilters.sex) {
            filtered = filtered.filter((item) => item.sex === updatedFilters.sex);
        }
        if (updatedFilters.m_year) {
            filtered = filtered.filter((item) => item.m_year === parseInt(updatedFilters.m_year, 10));
        }
        if (updatedFilters.b_year) {
            filtered = filtered.filter((item) => item.b_year === parseInt(updatedFilters.b_year, 10));
        }
        setFilteredData(filtered);
    };

    const handleFilterChange = (filterName, selectedFilter) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [filterName]: selectedFilter };
            applyFilters(updatedFilters); // Apply filters after state update
            return updatedFilters;
        });
    };

    const handleSearchResults = (searchResults) => {
        setFilteredData(searchResults);
    };

    return (
        <div className='missing-list-container'>
            <h1>Baza Zaginionych</h1>

            {/* Search Field and Button */}
            <SearchPerson onFilterChange={handleSearchResults} />

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                <VoivFilterMenu onFilterChange={(selectedFilter) => handleFilterChange('voiv', selectedFilter)} />
                <SexFilterMenu onFilterChange={(selectedFilter) => handleFilterChange('sex', selectedFilter)} />
                <MYearFilter onFilterChange={(selectedFilter) => handleFilterChange('m_year', selectedFilter)} />
                <BYearFilter onFilterChange={(selectedFilter) => handleFilterChange('b_year', selectedFilter)} />
            </div>

            {/* Display selected filters */}
            <div>
                {filters.voiv && <p><strong>Województwo:</strong> {filters.voiv}</p>}
                {filters.sex && <p><strong>Płeć:</strong> {filters.sex}</p>}
                {filters.m_year && <p><strong>Rok zaginięcia:</strong> {filters.m_year}</p>}
                {filters.b_year && <p><strong>Rok urodzenia:</strong> {filters.b_year}</p>}
            </div>

            {/* List of Missing People */}
            {filteredData.length <= 0 ? (
                <h3>Brak danych</h3> // If no filtered data available
            ) : (
                <ul>
                    {filteredData.map((item) => (
                        <li key={item.id}>
                            <h3>{item.name} {item.surname}</h3>
                            <p><strong>Województwo:</strong> {item.voiv}</p>
                            <p><strong>Rok zaginięcia:</strong> {item.m_year}</p>
                            <p><strong>Rok urodzenia:</strong> {item.b_year}</p>
                            <p><strong>Płeć:</strong> {item.sex}</p>
                            <p><strong>Opis:</strong> {item.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MissingList;
