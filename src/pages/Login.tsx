import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';

export const Login = () => {
  const { user, signin } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Login Page</h1>
      {<button onClick={signin}>Sign in</button>}
    </div>
  );
};

export default Login;
