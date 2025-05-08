import axios from 'axios';
import Cookies from 'js-cookie';

// Function to save token and user data
const saveTokenAndUser = (token, refreshToken, user) => {
    // Save tokens and user data in cookies
    Cookies.set('token', token, { expires: 1 / 24 });  // token expires in 1 hour
    Cookies.set('refreshToken', refreshToken, { expires: 7 });  // refresh token expires in 7 days
    Cookies.set('user', JSON.stringify(user));  // Save user data in cookies

    // Save user data in localStorage
    localStorage.setItem('userProfile', JSON.stringify(user));

    // Set the authorization token for subsequent API requests
    axios.defaults.headers['Authorization'] = `Bearer ${token}`;
};

// Function to get the token from cookies
const getTokenFromCookies = () => {
    return Cookies.get('token');
};

// Function to clear token and user data
const clearTokenAndUser = () => {
    // Remove cookies and localStorage items
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    Cookies.remove('user');
    localStorage.removeItem('userProfile');

    // Remove the authorization token from axios headers
    delete axios.defaults.headers['Authorization'];
};

export { saveTokenAndUser, getTokenFromCookies, clearTokenAndUser };
