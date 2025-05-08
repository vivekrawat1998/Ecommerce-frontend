import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return (
      <div>
        <h2>Welcome, {user.name}</h2>
        <p>Email: {user.email}</p>
        <img src={user.picture} alt="User Avatar" />
      </div>
    );
  }

  return <div>You are not logged in</div>;
};

export default Profile;
