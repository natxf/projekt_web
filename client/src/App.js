import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MissingList from './missingList';
import Home from './home';
import Register from './register';
import Login from './login';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data" element={<MissingList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
