import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import { AuthContext } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
    const isLoggedIn = useContextSelector(AuthContext, (v) => v.isLoggedIn);;
    
    return (
        <Router>
            <Routes>
             {!isLoggedIn ? (
                    <Route path="*" element={<Login />} />
                ) : (
                    <>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </>
                )}
            </Routes>
        </Router>
    );
};


export default AppRoutes;