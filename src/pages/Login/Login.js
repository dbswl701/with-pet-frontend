import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  width: 400px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  background-color: #731;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-right: 10px;
  cursor: pointer;
`;

function Login({ setState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('https://withpet.site/api/v1/users/login', {
      id: username,
      password,
    }, { withCredentials: true })
      .then(() => {
        setState('login');
        alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
        navigate('../');
      })
      .catch(() => {
        alert('로그인에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };

  return (
    <Container>
      <Card>
        <Form>
          <FormGroup>
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" onClick={onSubmit}>
            로그인
          </Button>
          <Button type="submit" onClick={() => navigate('../signup')}>
            회원가입
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Login;
