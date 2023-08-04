/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import userimgdefault from '../../assets/forAddPic.png';
import logo from '../../assets/logo.png';
import logoName from '../../assets/logo_name.png';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  // height: 90vh;
  background-color: #fffaf0;
  outline: 1px solid #caa969;
  margin: 30px auto 60px auto;
  padding: 64px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // grid-template-rows: auto 1fr auto;
  // grid-gap: 20px;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  width: flex;
`;

const ImageContainer = styled.div`
  justify-self: center;
  background-color: #fff;
  border: 1px solid #caa969;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 31px;
  width: 318px;
  height: 44px;
`;

const Input = styled.input`
  width: 326px;
  height: 47px;
  margin-top: 8px;
`;

const LogoContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CheckButton = styled.button`
  background-color: #CAA969;
  color: white;
  border: none;
  width: 72px;
  height: 24px;
  margin-top: 31px;
`;

const Title = styled.p`
  margin: 31px 0 0 0;
  font-weight: bold;
  font-size: 16px;
  color: #696969;
  text-align: left;
  display: flex;
`;

function SignupForm() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressRoad, setAddressRoad] = useState('');
  const [addressPost, setAddressPost] = useState('');
  const [addressDtail, setAddressDtail] = useState('');
  const [email, setEmail] = useState('');

  const [toggle, setToggle] = useState(false);
  const [certification, setCertifiation] = useState('');
  const [saveCertification, setSaveCertifiation] = useState('');
  const [completeCertification, setCompleteCertification] = useState(false);
  // eslint-disable-next-line consistent-return
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!completeCertification) {
      return alert('전화번호 인증이 필요합니다.');
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      setPasswordConfirm('');
      // eslint-disable-next-line consistent-return
      return;
    }
    if (
      password === ''
      || name === ''
      || phone === ''
      || addressRoad === ''
      || addressPost === ''
      || addressDtail === ''
      || email === ''
    ) {
      alert('빈 칸을 모두 입력해주세요.');
      // eslint-disable-next-line consistent-return
      return;
    }
    axios
      .post('https://withpet.site/api/v1/users/signup', {
        userPassword: password,
        userName: name,
        phoneNum: phone,
        address: {
          streetAdr: addressRoad,
          zipcode: addressPost,
          detailAdr: addressDtail,
        },
        userEmail: email,
        profileImg: imageSrc[0],
        userPasswordCheck: passwordConfirm,
      })
      .then(() => {
        alert('회원가입에 성공했습니다.');
        navigate('/');
      })
      .catch(() => {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      });
  };

  const onAddressDetail = (detail) => {
    setAddressDtail(detail);
  };

  const openPostcodeSearch = () => {
    // eslint-disable-next-line no-undef
    new daum.Postcode({
      oncomplete(data) {
        setAddressPost(data.zonecode);
        setAddressRoad(data.roadAddress);
      },
      onAddressDetail,
      width: 430,
      height: 600,
      popupName: 'postcodePopup',
    }).open();
  };

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    axios
      .post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setImageSrc(res.data.result);
      });
  };

  const onClick = () => {
    if (!toggle) {
      axios.get(`https://withpet.site/api/v1/certification?to=${phone}`)
        .then((res) => {
          alert('인증번호가 발급되었습니다.');
          setSaveCertifiation(res.data.result);
          setToggle(true);
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            alert(err.response.data.message);
          }
        });
    } else if (saveCertification === certification) {
      alert('인증이 완료되었습니다.');
      setCompleteCertification(true);
      setToggle(false);
    } else {
      alert('인증번호가 일치하지 않습니다. 인증번호가 다시 발급되었습니다');
      axios.get(`https://withpet.site/api/v1/certification?to=${phone}`)
        .then((res) => {
          setSaveCertifiation(res.data.result);
          setCertifiation('');
        });
    }
  };

  return (
    <>
      <GlobalStyle />
      <LogoContainer>
        <img src={logo} alt="로고" style={{ width: '98px', height: '98px' }} />
        <img src={logoName} alt="로고 이름" style={{ width: '229px', height: '98px' }} />
      </LogoContainer>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* 프로필 사진 */}
          <ImageContainer>
            <label htmlFor="image-select">
              {imageSrc ? (
                <img src={imageSrc} alt="프로필 사진 미리보기" />
              ) : (
                <img src={userimgdefault} alt="userimgdefault" />
              )}
            </label>
            <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={handleImageUpload} />
          </ImageContainer>

          {/* <img id="preview-image" alt="이미지 미리보기" src={data.serviceImg} />
          <label htmlFor="image-select">프로필 이미지 선택</label>
          <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} /> */}

          <div style={{ display: 'flex', justifyContent: 'space-between', width: '326px' }}>
            <Title htmlFor="email">이메일</Title>
            <CheckButton>중복확인</CheckButton>
          </div>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
          />

          <div style={{ width: '326px' }}>
            <Title htmlFor="password">비밀번호</Title>
          </div>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="영문자 + 숫자 + 특수문자 8자리 이상"
          />
          <div style={{ width: '326px' }}>
            <Title htmlFor="passwordConfirm">비밀번호 확인</Title>
          </div>
          <Input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <div style={{ width: '326px' }}>
            <Title htmlFor="name">이름</Title>
          </div>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="위드펫"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '326px' }}>
            <Title htmlFor="phone">전화번호</Title>
            <CheckButton>인증하기</CheckButton>
          </div>
          <Input
            type="text"
            id="phone"
            value={phone}
            maxLength={13}
            onChange={(e) => setPhone(String(e.target.value).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))}
            placeholder="010-1234-5678"
          />
          { toggle
                && (
                <Input
                  style={{ width: '248px' }}
                  type="text"
                  value={certification}
                  onChange={(e) => setCertifiation(e.target.value)}
                  placeholder="인증번호 입력"
                  disabled={completeCertification}
                />
                )}
          <Input type="button" value="인증하기" onClick={onClick} disabled={completeCertification} />

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title>주소</Title>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '326px' }}>
              <Input
                style={{ width: '152px' }}
                type="text"
                id="addressPost"
                value={addressPost}
                readOnly
                placeholder="우편번호"
                onChange={(e) => setAddressPost(e.target.value)}
              />
              <input
                type="button"
                style={{
                  background: '#CAA969', width: '152px', height: '47px', border: 'none', color: 'white', marginTop: '8px',
                }}
                onClick={openPostcodeSearch}
                value="주소검색"
              />
            </div>

            <Input
              type="text"
              value={addressRoad}
              readOnly
              placeholder="도로명 주소"
              onChange={(e) => setAddressRoad(e.target.value)}
            />

            <Input
              type="text"
              value={addressDtail}
              placeholder="상세주소"
              onChange={(e) => setAddressDtail(e.target.value)}
            />
          </div>
          <Button type="submit">회원가입</Button>
        </Form>
      </Container>
    </>
  );
}

export default SignupForm;
