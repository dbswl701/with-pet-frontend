import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import {
  FormWrapper, StyledButton, StyledInput, JustDiv,
} from '../../styles/login/signup/style';

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
        alert('회원가입에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };
  return (
    // <div className="container">
    //   <div className="card">
    //     <div className="card-body">
    <FormWrapper>
      {/* <form> */}
      <div className="form-group">
        <label htmlFor="username" />
        <StyledInput
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" />
        <StyledInput
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <JustDiv>
        <StyledButton type="submit" className="btn" onClick={onSubmit}>
          Login
        </StyledButton>
        <StyledButton type="submit" className="btn" onClick={() => navigate('../signup')}>
          Signup
        </StyledButton>
      </JustDiv>
      {/* </form> */}
      {/* </div>
       </div>
     </div> */}
    </FormWrapper>
  );
}

export default Login;
