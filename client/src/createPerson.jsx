import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPerson } from "./services/api";

function CreatePerson() {
    const [values, setValues] = useState({
        name:'',
        surname: '',
        voiv:'',
        m_year:'',
        b_year: '',
        sex: '',
        description: ''
    })

    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        createPerson(values)
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
                <h2>Wprowadź dane</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Imię</strong></label>
                        <input type="text" placeholder="Imię" name="name" 
                        onChange={e => setValues({...values, name:e.target.value})}  className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname"><strong>Nazwisko</strong></label>
                        <input type="text" placeholder="Nazwisko" name="surname" 
                        onChange={e => setValues({...values, surname:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="voiv"><strong>Województwo</strong></label>
                        <select name="voiv" onChange={e => setValues({...values, voiv:e.target.value})} className="form-control rounded-0">
                        <option value="" disabled selected>Wybierz województwo</option>
                        <option value="Dolnośląskie">Dolnośląskie</option>
                        <option value="Kujawsko-Pomorskie">Kujawsko-Pomorskie</option>
                        <option value="Lubelskie">Lubelskie</option>
                        <option value="Lubuskie">Lubuskie</option>
                        <option value="Łódzkie">Łódzkie</option>
                        <option value="Małopolskie">Małopolskie</option>
                        <option value="Mazowieckie">Mazowieckie</option>
                        <option value="Opolskie">Opolskie</option>
                        <option value="Podkarpackie">Podkarpackie</option>
                        <option value="Podlaskie">Podlaskie</option>
                        <option value="Pomorskie">Pomorskie</option>
                        <option value="Śląskie">Śląskie</option>
                        <option value="Świętokrzyskie">Świętokrzyskie</option>
                        <option value="Warmińsko-Mazurskie">Warmińsko-Mazurskie</option>
                        <option value="Wielkopolskie">Wielkopolskie</option>
                        <option value="Zachodniopomorskie">Zachodniopomorskie</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="m_year"><strong>Rok zaginięcia</strong></label>
                        <input type="number" placeholder="Rok zaginięcia" name="m_year" 
                        onChange={e => setValues({...values, m_year:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="b_year"><strong>Rok urodzenia</strong></label>
                        <input type="number" placeholder="Rok urodzenia" name="b_year" 
                        onChange={e => setValues({...values, b_year:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sex"><strong>Płeć</strong></label>
                        <select name="sex" onChange={e => setValues({...values, sex:e.target.value})} className="form-control rounded-0">
                            <option value="" disabled selected>Wybierz płeć</option>
                            <option value="Kobieta">Kobieta</option>
                            <option value="Mężczyzna">Mężczyzna</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description"><strong>Opis</strong></label>
                        <input type="text" aria-multiline placeholder="Opis" name="description" 
                        onChange={e => setValues({...values, description:e.target.value})}className="form-control rounded-0" />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Dodaj osobę</button>
                    <Link to ="/data" className="btn btn-default w-100 rounded-0 text-decoration-none">Powrót do listy zaginionych</Link>
                </form>
            </div>
        </div>
    )
}

export default CreatePerson