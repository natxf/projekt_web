import React, { useState } from 'react';
import '../css/filters.css';

const VoivFilterMenu = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const wojewodztwa = [
    "Dolnośląskie",
    "Kujawsko-Pomorskie",
    "Lubelskie",
    "Lubuskie",
    "Łódzkie",
    "Małopolskie",
    "Mazowieckie",
    "Opolskie",
    "Podkarpackie",
    "Podlaskie",
    "Pomorskie",
    "Śląskie",
    "Świętokrzyskie",
    "Warmińsko-Mazurskie",
    "Wielkopolskie",
    "Zachodniopomorskie"
  ];

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onFilterChange(selectedValue); 
  };

  return (
    <div className='filter-container'>
      <h3>Województwo</h3>
      <div>
        <label htmlFor="dropdown"></label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelect}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="">Brak filtru</option>
          {wojewodztwa.map((woj, index) => (
            <option key={index} value={woj}>
              {woj}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};

export default VoivFilterMenu;
