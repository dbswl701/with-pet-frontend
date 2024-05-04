/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './Signup.styles';
// import PostSignUp from '../../services/user';
import PostFileUpload from '../../services/upload';
import baseProfile from '../../constants/image';
import baseUrl from '../../services/api';

const emailRegex = /^[a-z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/i;
const nameRegex = /^[ㄱ-ㅎ가-힣a-z0-9_-]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,}$/;
const phoneRegex = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;

// Zod 스키마 정의
const signUpSchema = z.object({
  email: z
    .string()
    .regex(emailRegex, '이메일 형식에 맞게 입력해주세요.')
    .email('이메일 형식을 입력해주세요.'),
  name: z
    .string()
    .min(3, '3글자 이상 입력해주세요')
    .max(20, '20글자 이하로 입력해주세요')
    .regex(nameRegex, '이름을 입력해주세요'),
  password: z
    .string()
    .min(8, '8자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요')
    .regex(passwordRegex, '영문, 특수문자, 숫자를 포함하여 입력해주세요'),
  passwordCheck: z
    .string()
    .min(8, '8자 이상 입력해주세요')
    .max(20, '20자 이하로 입력해주세요')
    .regex(passwordRegex, '영문, 특수문자, 숫자를 포함하여 입력해주세요'),
  phone: z
    .string()
    .regex(phoneRegex, '알맞은 휴대폰 번호를 입력해주세요'),
  // profile: z.string().url(),
});

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  console.log(watch('password')); // watch input value by passing the name of it
  console.log('error:', errors);
  // const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  // const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  const [addressRoad, setAddressRoad] = useState('');
  const [addressPost, setAddressPost] = useState('');
  const [addressDtail, setAddressDtail] = useState('');
  // const [email, setEmail] = useState('');

  const [toggle, setToggle] = useState(false);
  const [certification, setCertifiation] = useState('');
  const [saveCertification, setSaveCertifiation] = useState('');
  const [completeCertification, setCompleteCertification] = useState(false);

  // eslint-disable-next-line consistent-return
  const onSubmit = (data) => {
    // e.preventDefault();

    // 인증
    signUpSchema.parse(data);
    console.log('폼 데이터 유효성 검사 통과:', data);

    // 수정 전 인증
    // if (!completeCertification) {
    //   return alert('전화번호 인증이 필요합니다.');
    // }

    // if (password !== passwordConfirm) {
    //   alert('비밀번호가 일치하지 않습니다.');
    //   setPasswordConfirm('');
    //   // eslint-disable-next-line consistent-return
    //   return;
    // }
    // if (
    //   password === ''
    //   || name === ''
    //   || phone === ''
    //   || addressRoad === ''
    //   || addressPost === ''
    //   || addressDtail === ''
    //   // || email === ''
    // ) {
    //   alert('빈 칸을 모두 입력해주세요.');
    //   // eslint-disable-next-line consistent-return
    //   return;
    // }

    // 이건 살려야 함
    // PostSignUp();
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

    try {
      const result = await PostFileUpload(formData);
      console.log('Upload successful. Result:', result);
      setImageSrc(result.data.result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const onClick = () => {
    const phone = getValues('phone');
    if (!toggle) {
      axios.get(`${baseUrl}/v2/sms-authentication?to=${phone}`)
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

  const handleCheckEmailDuplicate = () => {
    const email = getValues('email'); // 이메일 값 얻기
    console.log('이메일을 출력해보자!', email);
  };

  return (
    <>
      <S.Container>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <h1>회원가입</h1>
          {/* 프로필 사진 */}
          <S.ImageContainer>
            <label htmlFor="image-select">
              {imageSrc ? (
                <img src={imageSrc} alt="프로필 사진 미리보기" />
              ) : (
                <img src={baseProfile} alt="baseProfile" />
              )}
            </label>
            <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={handleImageUpload} />
            <S.ModifyIcon className="material-symbols-outlined">
              edit
            </S.ModifyIcon>
          </S.ImageContainer>

          <S.InputContainerWrapper>
            <S.InputContainer>
              <S.Title htmlFor="email">이메일</S.Title>
              <S.CheckContainer>
                <S.Input type="email" id="email" placeholder="example@gmail.com" {...register('email', { required: true })} />
                <S.CheckButton onClick={handleCheckEmailDuplicate}>중복확인</S.CheckButton>
              </S.CheckContainer>
            </S.InputContainer>
            {errors.email && <S.ErrorMessage>{errors?.email.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>

          <S.InputContainerWrapper>
            <S.InputContainer>
              <S.Title htmlFor="name">이름</S.Title>
              <S.Input
                type="text"
                id="name"
                placeholder="위드펫"
                {...register('name', { required: true })}
              />
            </S.InputContainer>
            {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>

          <S.InputContainerWrapper>
            <S.InputContainer>
              <S.Title htmlFor="password">비밀번호</S.Title>
              <S.Input
                type="password"
                id="password"
                {...register('password', { required: true })}
                placeholder="영문자 + 숫자 + 특수문자 8자리 이상"
              />
            </S.InputContainer>
            {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>

          <S.InputContainerWrapper>
            <S.InputContainer>
              <S.Title htmlFor="passwordCheck">비밀번호 확인</S.Title>
              <S.Input
                type="password"
                id="passwordCheck"
                {...register('passwordCheck', { required: true })}
              />
            </S.InputContainer>
            {errors.passwordCheck && <S.ErrorMessage>{errors.passwordCheck.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>

          <S.InputContainerWrapper>
            <S.InputContainer>
              <S.Title htmlFor="phone">전화번호</S.Title>
              <S.CheckContainer>
                <S.Input
                  type="text"
                  id="phone"
                  // value={phone}
                  maxLength={13}
                  {...register('phone', { require: true })}
                  // onChange={(e) => setPhone(String(e.target.value).replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))}
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
            {errors.phone && <S.ErrorMessage>{errors.phone.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>

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
