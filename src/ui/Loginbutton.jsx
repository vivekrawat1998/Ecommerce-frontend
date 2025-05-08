import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios'; // Make sure axios is imported

const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently, isLoading } = useAuth0();

    const sendTokenToBackend = async () => {
        try {
            const token = await getAccessTokenSilently();
            console.log("token", token);
            const res = await axios.post("http://localhost:9898/api/auth/auth0-login", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Your App Token:", res.data.token);
        } catch (error) {
            console.error("Error sending token to backend:", error);
            // Optionally, you could show a message to the user here
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className='border-2'>
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>Login with Auth0</button>
            ) : (
                <>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={sendTokenToBackend}>Login to App Backend</button>
                    <br />
                    <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                </>
            )}
        </div>
    );
}

export default LoginButton;
