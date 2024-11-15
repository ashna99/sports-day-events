import React, { useCallback, useState, useMemo } from 'react';
import { createContext } from 'use-context-selector';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
}

interface AuthContextProps extends AuthState {
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
    const [authState, setAuthState] = useState<AuthState>(() => {
        const storedToken = localStorage.getItem('token');
        return {
            isLoggedIn: !!storedToken,
            token: storedToken
        };
    });

    const login = useCallback((token: string) => {
        localStorage.setItem('token', token);
        setAuthState({
            isLoggedIn: true,
            token
        });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setAuthState({
            isLoggedIn: false,
            token: null
        });
    }, []);

    const contextValue = useMemo(() => ({
        ...authState,
        login,
        logout
    }), [authState, login, logout]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};