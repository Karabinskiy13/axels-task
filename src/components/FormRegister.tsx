import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Body, Button, Form, Input, Label, Wrapper } from '../styled/RegisterForm';

export type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

const FormRegister = ({ title, handleClick }: FormProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(email, password);

  return (
    <Body style={{ backgroundColor: 'black' }}>
      <Wrapper>
        <div className="shape"></div>
        <div className="shape"></div>
      </Wrapper>
      <Form>
        <h3>Login Here</h3>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => handleClick(email, password)}>{title}</Button>
        <Button onClick={() => navigate('/register')}>Registration</Button>
      </Form>
    </Body>
  );
};

export default FormRegister;
