import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissingList from './views/missingList.jsx';
import Home from './views/home.jsx';
import Register from './views/register';
import Login from './views/login';
import CreatePerson from './views/createPerson.jsx';
import PersonalList from './views/personalList.jsx';
import EditPerson from './views/editPerson';
import Header from './views/header.jsx';

function App() {

    const [authUpdated, setAuthUpdated] = useState(false);

    const refreshHeader = () => {
        setAuthUpdated(prev => !prev); // Toggle the value
    };

    return (
        <BrowserRouter>
        <Header authUpdated={{authUpdated}}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data" element={<MissingList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login refreshHeader={refreshHeader} />} />
                <Route path="/add-person" element={<CreatePerson/>} />
                <Route path="/personal-list" element={<PersonalList />} />
                <Route path="/edit-data" element={<EditPerson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
