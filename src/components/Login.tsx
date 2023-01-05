import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Form from './FormRegister';

import { setUser } from '../redux/ducks/auth';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken
          })
        );
        navigate('/');
      })
      .catch(() => alert('Invalid user!'));
  };

  return (
    <div>
      <h1>Login</h1>
      <Form title="sign in" handleClick={handleLogin} />
      <p>
        Or <Link to="/register">registration</Link>
      </p>
    </div>
  );
};

export default Login;
