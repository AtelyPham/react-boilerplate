import React from 'react';
import { useAuth } from '../hooks';

export const Profile = () => {
  const { user, signout } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      {user && <button onClick={() => signout()}>Sign out</button>}
    </div>
  );
};

export default Profile;
