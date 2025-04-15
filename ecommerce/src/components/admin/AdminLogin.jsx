import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
            const isAuthenticated= localStorage.getItem('isAuthenticated');
            if(isAuthenticated){
                navigate('/admin/dashboard'); 
            }
        
    },[navigate]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setIsLoading(true); // Set loading state to true
    
        try {
            // Send a POST request to the backend's login endpoint
            const response = await axios.post('http://localhost:3000/api/admin/login', {
                username, // Send the username
                password, // Send the password
            });
    
            // Handle successful login
            const { token, user } = response.data; // Extract token and user information from the response
    
            // Store the token in localStorage for future requests
            localStorage.setItem('token', token);
    
            // Set the isAuthenticated flag in localStorage
            localStorage.setItem('isAuthenticated', 'true');
    
            // If rememberMe is checked, store the username in localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedUser', username);
            } else {
                localStorage.removeItem('rememberedUser');
            }
    
            // Redirect the user to the admin dashboard
            navigate('/admin/dashboard');
        } catch (error) {
            // Handle login failure
            console.error('Login failed:', error); // Log the error to the console
    
            // Display an alert to the user with an error message
            alert('Invalid credentials. Please try again.');
    
            // Set loading state to false
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Left side - Illustration */}
            <div className="hidden lg:flex lg:w-1/2 bg-indigo-400 items-center justify-center p-12">
                <div className="text-center">
                    <div className="mb-8">
                        {/* Add your illustration here */}
                        <img src="/admin_login.png" alt="" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-6">Admin Dashboard</h1>
                    <p className="text-xl text-white opacity-80">Manage your e-commerce platform with ease and security</p>
                </div>
            </div>
            
            {/* Right side - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="max-w-md w-full px-6 py-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
                        <p className="text-gray-600 mt-2">Please log in to your admin account</p>
                    </div>
                    
                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            
                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                'Log in'
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Having trouble? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Contact support</a>
                        </p>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Your session will automatically expire after 30 minutes of inactivity.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;