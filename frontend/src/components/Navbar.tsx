import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const isLoggedIn = useContextSelector(AuthContext, (v) => v.isLoggedIn);
    const logout = useContextSelector(AuthContext, (v) => v.logout);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <h2>Event Manager</h2>
            {isLoggedIn && (
                <button className="btn-secondary" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
};

export default Navbar;