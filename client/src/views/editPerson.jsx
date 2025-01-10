import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editPerson, mainPage } from "../services/api";

function EditPerson() {
    const { state } = useLocation();
    const person = state?.person; // Get the `person` object from the `state`
    const navigate = useNavigate();

    const [values, setValues] = useState({
        missing_person_id: person?.missing_person_id || '',
        name: person?.name || '',
        surname: person?.surname || '',
        voiv: person?.voiv || '',
        m_year: person?.m_year || '',
        b_year: person?.b_year || '',
        sex: person?.sex || '',
        description: person?.description || '',
    });

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

    useEffect(() => {
        if (!auth && !person) {
            navigate("/login", { replace: true }); 
        }

    }, [auth, person, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        editPerson(values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/personal-list');
                } else {
                    alert("Error");
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Wprowadź dane</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Imię</strong></label>
                        <input
                            type="text"
                            placeholder="Imię"
                            name="name"
                            value={values.name}
                            onChange={e => setValues({ ...values, name: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="surname"><strong>Nazwisko</strong></label>
                        <input
                            type="text"
                            placeholder="Nazwisko"
                            name="surname"
                            value={values.surname}
                            onChange={e => setValues({ ...values, surname: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="voiv"><strong>Województwo</strong></label>
                        <select
                            name="voiv"
                            value={values.voiv}
                            onChange={e => setValues({ ...values, voiv: e.target.value })}
                            className="form-control rounded-0"
                        >
                            <option value="" disabled>Wybierz województwo</option>
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
                        <input
                            type="number"
                            placeholder="Rok zaginięcia"
                            name="m_year"
                            value={values.m_year}
                            onChange={e => setValues({ ...values, m_year: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="b_year"><strong>Rok urodzenia</strong></label>
                        <input
                            type="number"
                            placeholder="Rok urodzenia"
                            name="b_year"
                            value={values.b_year}
                            onChange={e => setValues({ ...values, b_year: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="sex"><strong>Płeć</strong></label>
                        <select
                            name="sex"
                            value={values.sex}
                            onChange={e => setValues({ ...values, sex: e.target.value })}
                            className="form-control rounded-0"
                        >
                            <option value="" disabled>Wybierz płeć</option>
                            <option value="Kobieta">Kobieta</option>
                            <option value="Mężczyzna">Mężczyzna</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description"><strong>Opis</strong></label>
                        <input
                            type="text"
                            aria-multiline
                            placeholder="Opis"
                            name="description"
                            value={values.description}
                            onChange={e => setValues({ ...values, description: e.target.value })}
                            className="form-control rounded-0"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Zapisz zmiany</button>
                    <Link to="/personal-list" className="btn btn-default w-100 rounded-0 text-decoration-none">Anuluj zmiany</Link>
                </form>
            </div>
        </div>
    );
}

export default EditPerson;
