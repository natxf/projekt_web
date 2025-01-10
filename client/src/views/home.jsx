import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import { mainPage } from "../services/api";
import '../css/mainPage.css';

function Home() {

    const [auth, setAuth] = useState(false); 
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
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
                            <div>
                    <h3>Baza osób zaginionych</h3>
                    <p>
                        Nasza inicjatywa ma na celu pomoc w odnalezieniu osób zaginionych oraz wspieranie ich bliskich w trudnych chwilach. Przez nasze działania chcemy stworzyć platformę, która połączy ludzi, organizacje i służby porządkowe w walce o odnalezienie osób, które zniknęły bez śladu.<br />
                        Wierzymy, że za pomocą nowoczesnych technologii, współpracy społecznej oraz zwiększonej świadomości, możemy pomóc w odnalezieniu każdej osoby, która zaginęła. Nasza platforma umożliwia użytkownikom zgłaszanie zaginięć, przeglądanie listy osób zaginionych oraz aktualizowanie informacji na temat poszukiwań. Każdy może dołączyć do naszej inicjatywy, aby pomóc w rozwiązywaniu tajemnic zaginięć.<br />

                        Współpracujemy z organizacjami pozarządowymi, służbami porządkowymi i instytucjami, aby zapewnić jak najszerszy zasięg naszych działań. Naszym celem jest nie tylko odnalezienie osób zaginionych, ale również zapewnienie wsparcia emocjonalnego ich rodzinom i bliskim. <br />

                        Każde zgłoszenie jest traktowane poważnie, a każdy, kto chce pomóc, może wziąć udział w tej inicjatywie. Wspólnie możemy zrobić różnicę!
                    </p>
                </div>
            {auth ? (
                <p></p>
            ) : (
                <div>
                    <h3>Zaloguj się aby uzyskać pełny dostęp lub przejdź do listy zaginionych</h3>
                    <div className="btn-container">
                        <Link to="/login" className="btn btn-outline-primary">Zaloguj się</Link>
                        <Link to="/data" className="btn btn-outline-primary">Wyświetl listę</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
