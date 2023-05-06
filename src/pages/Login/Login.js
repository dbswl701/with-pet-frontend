import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/login', {
      id: username,
      password,
    })
      .then(() => {
        alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
      })
      .catch(() => {
        alert('회원가입에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn" onClick={onSubmit}>
              Login
            </button>
            <button type="submit" className="btn" onClick={() => navigate('../signup')}>
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
