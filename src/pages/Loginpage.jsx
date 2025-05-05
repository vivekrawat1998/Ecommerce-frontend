import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/AxiosInstance'; // Import the custom axios instance
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);

    const togglePassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/user/signin', form);
            console.log("Login Response:", res.data); 

            if (!res.data.error) {
                // Store token and user info in cookies
                const { token, refreshToken, user } = res.data;
                
                // Set token and refreshToken in cookies
                Cookies.set('token', token, { expires: 1 / 24 }); // 1 hour expiry for access token
                Cookies.set('refreshToken', refreshToken, { expires: 7 }); // 7 days expiry for refresh token

                // Store user information in cookies (optional)
                Cookies.set('user', JSON.stringify(user));

                // Set token to axios instance headers for future requests
                axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;

                // Debugging: Check the token in the cookies and axios headers
                console.log("Token in cookies:", Cookies.get('token'));
                console.log("Axios Authorization header:", axiosInstance.defaults.headers['Authorization']);

                // Call the profile API after login to fetch user details
                const profileResponse = await axiosInstance.get("/user/profile");
                console.log("Profile API Response:", profileResponse.data);

                if (profileResponse.data) {
                    console.log("User Profile Data:", profileResponse.data);
                    // Optionally store profile data in local storage or state if needed
                    localStorage.setItem('userProfile', JSON.stringify(profileResponse.data));
                }

                // Navigate to the home/dashboard page or any route
                navigate('/');
            } else {
                setError(res.data.message || 'Unknown error');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred, please try again');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-6">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-4xl grid grid-cols-1 md:grid-cols-2">
                {/* Left Side - Branding */}
                <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-blue-500 to-purple-500 text-white p-10">
                    <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-center">Log in to continue managing your dashboard</p>
                </div>

                {/* Right Side - Form */}
                <div className="p-8 sm:p-12">
                    <h3 className="text-2xl font-bold mb-6 text-gray-800">Login to Your Account</h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600 font-medium">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                                    placeholder="••••••••"
                                />
                                <span
                                    onClick={togglePassword}
                                    className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </span>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full font-semibold py-2 rounded-lg transition duration-300 ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
