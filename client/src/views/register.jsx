import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerForm } from "../services/api";
import { mainPage } from "../services/api";
function Register() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const [auth, setAuth] = useState(false); 
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');

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
            .catch(err => console.error(err));
    }, []);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        registerForm(values)
        .then(res => {
            if(res.data.Status==="Success"){
                navigate('/login');
            } else {
                alert("Error");
            };
        }).catch(err => {
            console.log(err);
        });
    };

    return(
         auth ? (
            navigate('/')
        ): (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Zarejestruj się</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Nazwa użytkownika</strong></label>
                        <input type="text" placeholder="Podaj nazwę użytkownika" name="name" 
                        onChange={e => setValues({...values, name:e.target.value})}  className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Adres email</strong></label>
                        <input type="email" placeholder="Podaj adres email" name="email" 
                        onChange={e => setValues({...values, email:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder="Utwórz hasło" name="password" 
                        onChange={e => setValues({...values, password:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Zarejestruj się</button>
                    <p>Rejestrując się wyrażasz zgodę na warunki i zgody</p>
                    <Link to ="/login" className="btn btn-default w-100 rounded-0 text-decoration-none">Zaloguj się</Link>
                </form>
            </div>
        </div>
    )
    )
}

export default Register