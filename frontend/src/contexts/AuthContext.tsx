import React, { useCallback, useState } from 'react';
import { createContext } from 'use-context-selector';

interface AuthContextProps {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    token: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!storedToken);
    const [token, setToken] = useState<string | null>(storedToken);

    const login = useCallback((token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setIsLoggedIn(false);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
