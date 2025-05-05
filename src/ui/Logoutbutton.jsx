import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Call the backend API to log out and clear cookies on the server-side
            await axios.post('http://localhost:9878/api/v1/user/logout', {}, { withCredentials: true });

            // Remove the token and user info from cookies (client-side)
            Cookies.remove('token');
            Cookies.remove('refreshToken');
            Cookies.remove('user');
            localStorage.removeItem('userProfile'); // Optional: clear local storage if used

            // Optionally clear session storage or local storage
            // localStorage.removeItem('userProfile');

            // Redirect user to login page after logging out
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
            // Optionally show a notification or alert here
        }
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
