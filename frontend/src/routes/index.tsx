import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { AuthContext } from '../contexts/AuthContext';

const AppRoutes: React.FC = () => {
    const isLoggedIn = useContextSelector(AuthContext, (v) => v.isLoggedIn);

    return (
        <Router>
            <Routes>
                <Route 
                    path="/login" 
                    element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} 
                />
                <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;