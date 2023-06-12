import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import dogBanner from '../../assets/dog_banner.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 50px;
`;

const FormTitle = styled.h3`
  text-align: center;
`;

const BannerBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: auto;
  position: relative;
  align-items: center;
`;

const Card = styled.div`
  width: 400px;
  padding: 20px;
  outline: 1px solid #f3deb5;
  border-radius: 5px;
  margin-top: 10px;
  justify-content="center"
  z-index: 1;
  background-color: #fff;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content="center"
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  justify-content="center"
  align-items: center;
`;

const Button = styled.button`
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 5px;
  border: none;
  margin: 0px auto;
  cursor: pointer;
`;

const ButtonSignUp = styled.button`
  color: #000;
  background-color: #fff;
  padding: 10px;
  border: none;
  margin: 0px auto;
  cursor: pointer;
`;

function Login({ setState, setUserInfo }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://withpet.site/api/v1/users/login',
        {
          id: username,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        setState('login');
        alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
        setUserInfo(res.data.result);
        localStorage.setItem('userInfo', JSON.stringify(res.data.result));
        navigate(-1);
      })
      .catch(() => {
        alert('로그인에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };

  return (
    <>
      <div className="img">
        <BannerBox>
          <img src={dogBanner} alt="dog_banner" />
        </BannerBox>
      </div>
      <div>
        <Container>
          <Card style={{ zIndex: '1' }}>
            <FormTitle>로그인</FormTitle>
            <Form>
              <div style={{ textAlign: 'center' }}>
                <FormGroup>
                  <TextField
                    label="ID 입력"
                    type="text"
                    id="username"
                    size="small"
                    border="none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    label="PW 입력"
                    type="password"
                    id="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </div>

              <Button type="submit" onClick={onSubmit}>
                로그인
              </Button>
              <ButtonSignUp type="submit" onClick={() => navigate('../signup')}>
                회원가입
              </ButtonSignUp>
            </Form>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Login;
