/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import userimgdefault from '../../assets/forAddPic.png';
import * as S from './Signup.styles';

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
      .post('https://withpet.site/api/v2/users/signup', {
        password,
        name,
        phone,
        address: {
          streetAdr: addressRoad,
          zipcode: addressPost,
          detailAdr: addressDtail,
        },
        email,
        profileImg: imageSrc[0],
        passwordCheck: passwordConfirm,
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
      <S.Container>
        <S.Form onSubmit={handleSubmit}>
          <h1>회원가입</h1>
          {/* 프로필 사진 */}
          <S.ImageContainer>
            <label htmlFor="image-select">
              {imageSrc ? (
                <img src={imageSrc} alt="프로필 사진 미리보기" />
              ) : (
                <img src={userimgdefault} alt="userimgdefault" />
              )}
            </label>
            <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={handleImageUpload} />
            <S.ModifyIcon className="material-symbols-outlined">
              edit
            </S.ModifyIcon>
          </S.ImageContainer>

          <S.InputContainer>
            <S.Title htmlFor="email">이메일</S.Title>
            <S.CheckContainer>
              <S.Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
              />
              <S.CheckButton>중복확인</S.CheckButton>

            </S.CheckContainer>
          </S.InputContainer>

          <S.InputContainer>
            <S.Title htmlFor="password">비밀번호</S.Title>
            <S.Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문자 + 숫자 + 특수문자 8자리 이상"
            />
          </S.InputContainer>

          <S.InputContainer>
            <S.Title htmlFor="passwordConfirm">비밀번호 확인</S.Title>

            <S.Input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </S.InputContainer>

          <S.InputContainer>
            <S.Title htmlFor="name">이름</S.Title>
            <S.Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="위드펫"
            />
          </S.InputContainer>

          <S.InputContainer>
            <S.Title htmlFor="phone">전화번호</S.Title>
            <S.CheckContainer>
              <S.Input
                type="text"
                id="phone"
                value={phone}
                maxLength={13}
                onChange={(e) => setPhone(String(e.target.value).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))}
                placeholder="010-1234-5678"
              />
              { toggle
                ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '326px' }}>
                    <S.Input
                      style={{ width: '72px' }}
                      type="text"
                      value={certification}
                      onChange={(e) => setCertifiation(e.target.value)}
                      placeholder="인증번호 입력"
                      disabled={completeCertification}
                    />
                    <S.Input
                      style={{
                        backgroundColor: '#CAA969', border: 'none', color: 'white', width: '72px',
                      }}
                      type="button"
                      value="인증하기"
                      onClick={onClick}
                    />
                  </div>

                )
                : (
                  <S.Input
                    style={{
                      backgroundColor: completeCertification ? '#C6C6C6' : '#CAA969', border: 'none', color: 'white', width: '72px',
                    }}
                    type="button"
                    value="인증하기"
                    onClick={onClick}
                    disabled={completeCertification}
                  />
                )}

            </S.CheckContainer>
          </S.InputContainer>

          <S.InputContainer>
            <S.Title>주소</S.Title>
            <S.AddressContainer>
              <S.CheckContainer>
                <S.Input
                  type="text"
                  id="addressPost"
                  value={addressPost}
                  readOnly
                  placeholder="우편번호"
                  onChange={(e) => setAddressPost(e.target.value)}
                />
                <S.CheckButton onClick={openPostcodeSearch}>주소검색</S.CheckButton>
              </S.CheckContainer>

              <S.Input
                type="text"
                value={addressRoad}
                readOnly
                placeholder="도로명 주소"
                onChange={(e) => setAddressRoad(e.target.value)}
              />

              <S.Input
                type="text"
                value={addressDtail}
                placeholder="상세주소"
                onChange={(e) => setAddressDtail(e.target.value)}
              />
            </S.AddressContainer>
          </S.InputContainer>

          <S.Button type="submit">회원가입</S.Button>
        </S.Form>
      </S.Container>
    </>
  );
}

export default SignupForm;
