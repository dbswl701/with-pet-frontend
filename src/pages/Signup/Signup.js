/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import userimgdefault from '../../assets/forAddPic.png';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 20px;
  align-items: center;
  background-color: #fffaf0;
  border-radius: 5px;
  outline: 1px solid #caa969;
  padding: 20px;
  width: flex;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Title = styled.h1`
  grid-row: 1;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
`;

const ImageContainer = styled.div`
  grid-row: 2;
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

const InputContainer = styled.div`
  grid-row: 3;
  grid-column: 1;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  input::placeholder {
    color: #ddd;
  }

  label {
    font-size: 12px;
  }

  input {
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #caa969;
  }

  span {
    margin-top: 5px;
    font-size: 12px;
    color: #888;
    text-align: left;
  }
`;

const InputContainer2 = styled.div`
  grid-row: 3;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  input::placeholder {
    color: #ddd;
  }

  label {
    font-size: 12px;
  }

  input {
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #caa969;
  }

  span {
    margin-top: 5px;
    font-size: 12px;
    color: #777;
    text-align: left;
  }
`;

const InputContainer3 = styled.div`
  grid-row: 3;
  grid-column: 3;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', sans-serif;
  input::placeholder {
    color: #ddd;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #caa969;
  }

  label {
    font-size: 12px;
  }

  input {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 12px;
    color: #777;
    text-align: left;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border-radius: 3px;
  border: 0px;
  float: right;
  svg {
    color: #caa969;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  grid-row: 4;
  justify-self: center;
`;

function SignupForm() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [username, setUsername] = useState('');
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
    // 회원가입 시 백엔드로 보내는 로직
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
      username === ''
      || password === ''
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
        userId: username,
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
    // console.log(phone);
    if (!toggle) {
      setToggle(true);
      axios.get(`https://withpet.site/api/v1/certification?to=${phone}`)
        .then((res) => {
          // console.log(res.data.result);
          alert('인증번호가 발급되었습니다.');
          setSaveCertifiation(res.data.result);
        });
    } else if (saveCertification === certification) {
      alert('인증이 완료되었습니다.');
      setCompleteCertification(true);
      setToggle(false);
    } else {
      alert('인증번호가 일치하지 않습니다. 인증번호가 다시 발급되었습니다');
      axios.get(`https://withpet.site/api/v1/certification?to=${phone}`)
        .then((res) => {
          // console.log(res.data.result);
          setSaveCertifiation(res.data.result);
          setCertifiation('');
        });
    }
  };
  // console.log(phone);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>
          <ImageContainer>
            <label htmlFor="image-select">
              {imageSrc ? (
                <img src={imageSrc} alt="프로필 사진 미리보기" />
              ) : (
                <img src={userimgdefault} alt="userimgdefault" />
              )}
            </label>
          </ImageContainer>
          <GridContainer>
            <input
              type="file"
              accept="image/*"
              id="image-select"
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
            <InputContainer>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="위드펫"
              />
              <label htmlFor="phone">전화번호</label>
              <input
                type="text"
                id="phone"
                value={phone}
                maxLength={13}
                onChange={(e) => setPhone(String(e.target.value).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))}
                placeholder="010-1234-5678"
              />
              { toggle
                && (
                <input
                  type="text"
                  value={certification}
                  onChange={(e) => setCertifiation(e.target.value)}
                  placeholder="인증번호 입력"
                  disabled={completeCertification}
                />
                )}
              <input type="button" value="인증하기" onClick={onClick} disabled={completeCertification} />
              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="withpet1@gmail.com"
              />
            </InputContainer>
            <InputContainer2>
              <label htmlFor="username">아이디</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="영문자 + 숫자 + 특수문자 8자리 이상"
              />
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </InputContainer2>
            <InputContainer3>
              <div>
                <p>주소</p>
                <SearchButton type="button" onClick={openPostcodeSearch}>
                  <SearchIcon />
                </SearchButton>
              </div>
              <input
                type="text"
                id="addressPost"
                value={addressPost}
                readOnly
                placeholder="우편번호"
                onChange={(e) => setAddressPost(e.target.value)}
              />
              <label htmlFor="addressRoad" />
              <input
                type="text"
                id="addressRoad"
                value={addressRoad}
                readOnly
                placeholder="도로명 주소"
                onChange={(e) => setAddressRoad(e.target.value)}
              />
              <label htmlFor="addressDtail" />
              <input
                type="text"
                id="addressDtail"
                value={addressDtail}
                placeholder="상세주소"
                onChange={(e) => setAddressDtail(e.target.value)}
              />
            </InputContainer3>
          </GridContainer>
          <ButtonContainer>
            <Button type="submit">회원가입</Button>
          </ButtonContainer>
        </Form>
      </Container>
    </>
  );
}

export default SignupForm;
