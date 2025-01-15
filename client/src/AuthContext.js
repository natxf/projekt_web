import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');

    const login = (userName) => {
        setAuth(true);
        setName(userName);
    };

    const logout = () => {
        setAuth(false);
        setName('');
    };

    return (
        <AuthContext.Provider value={{ auth, name, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
