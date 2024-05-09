import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import * as S from './Login.styles';
// import dogBanner from '../../assets/dog_banner.png';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo_name.png';
import googleSininImg from '../../assets/btn_google_signin_light_normal_web.png';
import baseUrl from '../../services/api';

function Login({ setState, setUserInfo }) {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(
      `${baseUrl}/v2/users/sign-in`,
      {
        email: loginInfo.email,
        password: loginInfo.password,
      },
      { withCredentials: true },
    )
      .then((res) => {
        setState('login');
        alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
        setUserInfo(res.data.result);
        localStorage.setItem('userInfo', JSON.stringify(res.data.result));
        // navigate(-1);
        navigate('/');
      })
      .catch(() => {
        alert('로그인에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  return (
    <>
      <S.LogoContainer>
        <img src={logo} alt="로고" style={{ width: '98px', height: '98px' }} />
        <img src={logoName} alt="로고 이름" style={{ width: '229px', height: '98px' }} />
      </S.LogoContainer>
      <S.Content>
        <S.Input placeholder="이메일 입력" value={loginInfo.email} name="email" onChange={onChange} />
        <S.Input type="password" placeholder="비밀먼호 입력" value={loginInfo.password} name="password" onChange={onChange} />
        <S.IDSave>
          {/* 아이디 저장하기 */}
          <input type="checkbox" id="id_save" />
          <label htmlFor="id_save">아이디 저장하기</label>
        </S.IDSave>
        <S.Button onClick={onSubmit}>로그인</S.Button>
        <img src={googleSininImg} alt="구글 로그인 이미지" style={{ width: '283px', height: '68px' }} />
        <Link to="../signup">회원가입</Link>
      </S.Content>
    </>
  );
}

export default Login;
