import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import FormRegister from './FormRegister';

import { setUser } from '../redux/ducks/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ backgroundColor: 'black' }}>
      <FormRegister title="sign in" handleClick={handleLogin} />
    </div>
  );
};

export default Login;
