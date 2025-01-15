import React, { useState } from 'react';
import '../css/filters.css';

const SexFilterMenu = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const plec = [
    "Kobieta",
    "Mężczyzna"
  ];

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue); 
  };

  return (
    <div className='filter-container'>
      <h3>Płeć</h3>
      <div>
        <label htmlFor="dropdown"></label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelect}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="">Brak filtru</option>
          {plec.map((plec, index) => (
            <option key={index} value={plec}>
              {plec}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default SexFilterMenu;
