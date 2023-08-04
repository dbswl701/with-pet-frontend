import React from 'react';
// import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import styled from 'styled-components';
// import dogBanner from '../../assets/dog_banner.png';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo_name.png';
import googleSininImg from '../../assets/btn_google_signin_light_normal_web.png';

const LogoContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 690px;
  height: 492px;
  background-color: #FFFBF4;
  border: 1px solid #CAA969;
  border-radius: 8px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px;
  justify-content: space-between;
`;

const Input = styled.input`
  width: 398px;
  height: 51px;
  border-radius: 8px;
  border: 1px solid #CAA969;
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const IDSave = styled.div`
  width: 398px;
`;
const Button = styled.button`
  width: 283px;
  height: 50px;
  background-color: #CAA969;
  border: none;
  border-radius: 10px;
  color: white;
`;

// function Login({ setState, setUserInfo }) {
function Login() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const navigate = useNavigate();
  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(
  //       'https://withpet.site/api/v1/users/login',
  //       {
  //         id: username,
  //         password,
  //       },
  //       { withCredentials: true },
  //     )
  //     .then((res) => {
  //       setState('login');
  //       alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
  //       setUserInfo(res.data.result);
  //       localStorage.setItem('userInfo', JSON.stringify(res.data.result));
  //       navigate(-1);
  //     })
  //     .catch(() => {
  //       alert('로그인에 실패했습니다.'); // eslint-disable-line no-alert
  //     });
  // };

  return (
    <>
      <LogoContainer>
        <img src={logo} alt="로고" style={{ width: '98px', height: '98px' }} />
        <img src={logoName} alt="로고 이름" style={{ width: '229px', height: '98px' }} />
      </LogoContainer>
      <Content>
        <Input placeholder="ID 입력" />
        <Input type="password" placeholder="PW 입력" />
        <IDSave>
          {/* 아이디 저장하기 */}
          <input type="checkbox" id="id_save" />
          <label htmlFor="id_save">아이디 저장하기</label>
        </IDSave>
        <Button>로그인</Button>
        <img src={googleSininImg} alt="구글 로그인 이미지" style={{ width: '283px', height: '68px' }} />
        <Link to="../signup">회원가입</Link>
      </Content>
    </>
  );
}

export default Login;
