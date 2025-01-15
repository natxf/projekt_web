import React, { useState, useEffect } from 'react';
import { fetchPerson } from '../services/api';
import '../css/searchPerson.css'

const SearchPerson = ({onFilterChange}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if(!searchTerm.trim()){
            setError('Enter search term');
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(`/search?term=${encodeURIComponent(searchTerm)}`);

            if(!response.ok) {
                throw new Error('failed to fetch results');
            }

            const data = await response.json();

            if(onFilterChange) {
                onFilterChange(data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className='search-container'>
            {error && <p style={{color: `red`}}>{error}</p>}
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='wyszukaj osobę'></input>
            <button onClick={handleSearch} disabled={isLoading}>{isLoading ? `szukanie...` : 'wyszukaj'}</button>
        </div>
    );
};

export default SearchPerson;
