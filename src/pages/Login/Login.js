import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import * as S from './Login.styles';
// import dogBanner from '../../assets/dog_banner.png';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo_name.png';
import googleSininImg from '../../assets/btn_google_signin_light_normal_web.png';
import useUserStore from '../../store/user';
import { PostSignIn } from '../../services/user';
import useIdStore from '../../store/id';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  // 아이디 기억하기
  const [isRemember, setIsRemember] = useState(false);
  const { rememberedId, setRememberedId, clearRememberedId } = useIdStore();

  useEffect(() => {
    // 시작했을 때, 아이디 정보 저장
    if (rememberedId !== '') {
      setLoginInfo({ ...loginInfo, email: rememberedId });
      setIsRemember(true);
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await PostSignIn(loginInfo.email, loginInfo.password);
      alert('로그인에 성공했습니다.'); // eslint-disable-line no-alert
      setUser(res.result);

      // 아이디 정보 저장
      if (isRemember) {
        setRememberedId(loginInfo.email);
      } else {
        clearRememberedId('');
      }

      // navigate(-1);
      navigate('/');
    } catch (err) {
      console.error('로그인 에러 발생:', err);
      alert('로그인에 실패했습니다.'); // eslint-disable-line no-alert
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const onCheckIDRemember = (e) => {
    setIsRemember(e.target.checked);
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
          <input type="checkbox" id="id_save" onChange={onCheckIDRemember} checked={isRemember} />
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
