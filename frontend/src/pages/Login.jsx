import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../Api'; // API Import

const Login = () => {
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // API Calling
            const { data } = await loginUser(formData);

            // Save Token and Role to LocalStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.userData.role);

            // Redirect based on Role
            if (data.userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/shop');
            }

        } catch (error) {
            console.error(error);
            alert('Invalid Credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            {/* increased to 2xl and added 'flex' for a split view */}
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left Side: Brand/Image Panel (Hidden on small screens) */}
                <div className="hidden md:flex md:w-1/2 bg-indigo-600 p-12 text-white flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-4">LuxeStore</h2>
                    <p className="text-indigo-100">Experience the finest collection of premium goods curated just for you.</p>
                </div>

                {/* Right Side: The Form */}
                <div className="w-full md:w-1/2 p-8 md:p-12 space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center md:text-left text-sm">
                        <span className="text-gray-500">Don't have an account? </span>
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;