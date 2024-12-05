import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData()
            .then((response) => {
              console.log('Data received:', response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Data from PostgreSQL</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.product_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
