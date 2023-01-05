import React from 'react';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import Form from './FormRegister';

import { setUser } from '../redux/ducks/auth';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
      .catch(console.error);
  };
  return (
    <div>
      <h1>Register</h1>
      <Form title="register" handleClick={handleRegister} />;
      <p>
        Already have account?
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;
