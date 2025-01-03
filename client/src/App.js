import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import VoivFilterMenu from './VoivFilterMenu';
import SexFilterMenu from './SexFilterMenu';

function App() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        voiv: '',
        sex: '',
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

        setFilteredData(filtered);
    };

    const handleFilterChange = (filterName, selectedFilter) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [filterName]: selectedFilter };
            applyFilters(updatedFilters); // Apply filters after state update
            return updatedFilters;
        });
    };

    return (
        <div>
            <h1>Baza Zaginionych</h1>
            <div style={{ padding: '20px' }}></div>
            <h2>Filtrowanie</h2>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
            <VoivFilterMenu onFilterChange={(selectedFilter) => handleFilterChange('voiv', selectedFilter)} />
            <SexFilterMenu onFilterChange={(selectedFilter) => handleFilterChange('sex', selectedFilter)} />
        </div>
            {/* Display selected filters */}
            <div>
                {filters.voiv && <p><strong>Województwo:</strong> {filters.voiv}</p>}
                {filters.sex && <p><strong>Płeć:</strong> {filters.sex}</p>}
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

export default App;
