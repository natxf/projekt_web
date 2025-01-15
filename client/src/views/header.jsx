import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/header.css';
import { mainPage } from '../services/api';
import { logout } from '../services/api';

function Header({authUpdated}) {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        mainPage()
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                } else {
                    setAuth(false);
                    setMessage(res.data.Error);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }, [authUpdated]);

    const handleLogout = () => {
        logout()
        .then(res => {
            navigate('/login');
        }).catch(err => console.log(err));
        setAuth(false); 
    };

    return (
        auth ? (
            <header className="header">
                <img src="../../public/logo192.png" alt="Company Logo" className="logo" />
                <nav>
                    <ul className="nav-list">
                        <div className="left-links">
                            <li><Link to="/">Strona główna</Link></li>
                            <li><Link to="/data">Lista zaginionych</Link></li>
                            <li><Link to='/add-person'>Dodaj osobę</Link></li>
                            <li><Link to='/personal-list'>Wyświetl swoją listę</Link></li>
                        </div>
                        <div className="right-links">
                            <li><Link to="/" onClick={handleLogout}>Wyloguj się</Link></li>
                        </div>
                    </ul>
                </nav>
            </header>
        ) : (
            <header className="header">
                <img src="../public/logo192.png" alt="Company Logo" className="logo" />
                <nav>
                    <ul className="nav-list">
                        <div className="left-links">
                            <li><Link to="/">Strona główna</Link></li>
                            <li><Link to="/data">Lista zaginionych</Link></li>
                        </div>
                        <div className="right-links">
                            <li><Link to="/login">Zaloguj się</Link></li>
                        </div>
                    </ul>
                </nav>
            </header>
        )
    );
}

export default Header;
