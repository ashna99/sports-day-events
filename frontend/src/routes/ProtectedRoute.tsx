import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/login' }) => {
    const isLoggedIn = useContextSelector(AuthContext, (v) => v.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;