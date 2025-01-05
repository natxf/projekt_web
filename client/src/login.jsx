import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginForm } from "./services/api";

function Login() {
    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        loginForm(values)
        .then(res => {
            if(res.data.Status==="Success"){
               navigate('/data');
            } else {
                alert("Error");
            };
        }).catch(err => {
            console.log(err);
        });
    };
    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Zaloguj się</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Adres email</strong></label>
                        <input type="email" placeholder="Podaj adres email" name="email" 
                         onChange={e => setValues({...values, email:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Hasło</strong></label>
                        <input type="password" placeholder="Podaj hasło" name="password" 
                         onChange={e => setValues({...values, password:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Zaloguj się</button>

                    <Link to ="/register" className="btn btn-default w-100 rounded-0 text-decoration-none">Utwórz konto</Link>
                </form>
            </div>
        </div>
    )
}

export default Login