import React, { useEffect, useState } from 'react';
import { fetchPersonalList, deletePerson } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { mainPage } from '../services/api';
import '../css/personalList.css';
 

function PersonalList() {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false); 
    const [auth, setAuth] = useState(false); 
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPersonalList()
            .then((response) => {
                console.log('Data received:', response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
                mainPage()
                .then(res => {
                    if(res.data.Status==="Success"){
                        setAuth(true);
                        setName(res.data.name);
                    } else {
                        setAuth(false);
                        setMessage(res.data.Error);
                    }
                })
    }, [refresh]);

    const handleDelete = (person) => {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć dane o ${person.name} ${person.surname}');

        if(confirmation) {
            const values = {
                id: person?.id,
                missing_person_id: person?.missing_person_id
            }

            deletePerson(values)
            .then((response) => {
                console.log("Person deleted", response.data);
                setData(data.filter(item => item.person_id !== person.person_id));
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error('Error deleting person', error);
            })
        }
    }

    return (
        !auth ? (
            <div className="centered-container">
                <Link to='/login' className='h3'>Zaloguj się aby uzyskać dostęp do swojej listy osób</Link>
            </div>
        ):(
        <div className='personal-list-container'>
            {data.length <= 0 ? (
                <h3>Brak danych</h3> 
            ) : (
                <ul>
                    {data.map((item) => (
                        <li key={item.person_id}>
                            <h3>{item.name} {item.surname}</h3>
                            <p><strong>Województwo:</strong> {item.voiv}</p>
                            <p><strong>Rok zaginięcia:</strong> {item.m_year}</p>
                            <p><strong>Rok urodzenia:</strong> {item.b_year}</p>
                            <p><strong>Płeć:</strong> {item.sex}</p>
                            <p><strong>Opis:</strong> {item.description}</p>
                            <div className='buttons-container'>
                                <Link to="/edit-data" state={{person: item}} className='btn btn-outline-primary w-30 rounded-0'>Edytuj dane
                                </Link>
                                <button type="button" className="btn btn-outline-danger w-30 rounded-0" onClick={() => handleDelete(item)}>Usuń osobę</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

        </div>
        )
    );
}

export default PersonalList;
