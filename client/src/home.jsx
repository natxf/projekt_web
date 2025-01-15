import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "./services/api";

function Home() {

    axios.defaults.withCredentials=true;

    const [auth, setAuth] = useState(false); 
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000')
        .then(res => {
            if(res.data.Status==="Success"){
                setAuth(true);
                setName(res.data.name);
            } else {
                setAuth(false);
                setMessage(res.data.Error);
            }
        })
    }, []);
    const handleLogout = () => {
        logout()
        .then(res => {
            navigate('/login');
        }).catch(err => console.log(err));
        setAuth(false); 
    };

    return (
        <div className="container mt-4">
            {auth ? (
                <div>
                    <h3>Jesteś zalogowany {name}</h3>
                    <button className="btn btn-danger" onClick={handleLogout}>Wyloguj</button>
                </div>
            ) : (
                <div>
                    <h3>{message}</h3>
                    <h3>Zaloguj się</h3>
                    <Link to="/login" className="btn btn-primary">Zaloguj się</Link>
                </div>
            )}
        </div>
    );
};

export default Home;
