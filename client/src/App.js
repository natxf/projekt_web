import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissingList from './missingList';
import Home from './home';
import Register from './register';
import Login from './login';
import CreatePerson from './createPerson';
import PersonalList from './personalList';
import EditPerson from './editPerson';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data" element={<MissingList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-person" element={<CreatePerson/>} />
                <Route path="/personal-list" element={<PersonalList />} />
                <Route path="/edit-data" element={<EditPerson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
