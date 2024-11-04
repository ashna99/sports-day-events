import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../contexts/AuthContext';
import LoginService from '../../services/login'; 
import './Login.css';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const login = useContextSelector(AuthContext, (v) => v.login);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await LoginService.login(username, password);
            login(response.token); 
            navigate('/', { replace: true });
        } catch (error:any) {
            console.log(error);
            if(error.status === 400){
                alert('Invalid Credentials!');
            } else {
                alert('Error authenticating user');
            }
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn-primary" type="submit" disabled={!username || !password}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
