import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient from '../api/client';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.post('/auth/login', { email, password });

            const token = response.data.token;
            // localStorage.setItem('token', token);
            login(token);            
            setIsLoggedIn(true);
            navigate('/dashboard');
            
            console.log('Login successful:', response.data);
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center">
            <div className="card card-custom p-4" style={{ width: '400px' }}>
                <h3 className="text-center mb-4" >Login</h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                {/* <button className="btn btn-secondary w-100 mt-2">Register</button> */}

            </div>
        </div>
    )

}

export default Login;