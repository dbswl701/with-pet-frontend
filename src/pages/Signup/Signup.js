/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
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
}).refine((data) => data.passwordCheck === data.password, {
  path: ['passwordCheck'],
  message: '비밀번호가 일치하지 않습니다.',
});

function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });
  console.log(watch('password')); // watch input value by passing the name of it
  console.log('error:', errors);

  // 에러 검증
  const isError = Object.keys(errors).length !== 0;

  console.log('에러 있는지 확인:', isError);
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

  // 이메일 중복 검사
  const [isEmailValid, setIsEmailValid] = useState(false);

  // 시간 확인
  const [time, setTime] = useState(180);

  // 휴대폰 인증
  const [isPhoneValid, setIsPhoneValid] = useState(false);

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

  useEffect(() => {
    let intervalId;

    if (toggle && time > 0) {
      intervalId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [toggle, time]);

  const onClick = () => {
    const phone = getValues('phone');
    if (!toggle) {
      axios.get(`${baseUrl}/v2/sms-authentication?to=${phone}`)
        .then((res) => {
          alert('인증번호가 발급되었습니다.');
          setSaveCertifiation(res.data.result);
          setToggle(true);

          // 타이머 시작
        })
        .catch((err) => {
          if (err.response && err.response.status === 409) {
            alert(err.response.data.message);
          }
        });
    } else if (saveCertification === certification) {
      alert('인증이 완료되었습니다.');
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

  // 전화번호 인증 확인
  const CheckPhone = async () => {
    // 백엔드에 맞는지 확인
    const phone = getValues('phone');
    try {
      const res = await axios.post(`${baseUrl}/v2/sms-authentication`, {
        authenticationNumber: certification,
        phone,
      });
      console.log('res:', res);
      setIsPhoneValid(true);
      setToggle(false);
      // 맞으면 확인 응답
    } catch (err) {
      console.log('err:', err);
    }
  };

  const handleCheckEmailDuplicate = () => {
    const email = getValues('email'); // 이메일 값 얻기
    console.log('이메일을 출력해보자!', email);
    // 유효한 이메일 형식이 아니면 막는다
    console.log('errors.email:', errors.email);
    if (!email || errors.email) {
      return;
    }
    axios.post(`${baseUrl}/v2/users/email-duplicates`, { email })
      .then((res) => {
        console.log('성공!,', res);
        setIsEmailValid(true);
      })
      .catch((err) => {
        console.log('실패!', err);
      });
  };

  const handleEmailChange = () => {
    setIsEmailValid(false);
    console.log('change!!!');
    // 유효성 검사 통과 확인
  };
  console.log('notDuplicateEmail:', isEmailValid);

  // 시간 초 -> 분 변환
  const convertMinutes = () => {
    const minute = parseInt(time / 60, 10).toString().padStart(2, '0');
    const second = (time % 60).toString().padStart(2, '0');
    return `${minute}:${second}`;
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
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <S.Input
                      {...field}
                      type="email"
                      id="email"
                      placeholder="example@gmail.com"
                      onChange={(e) => {
                        field.onChange(e);
                        handleEmailChange(e.target.value);
                      }}
                    />
                  )}
                />
                <S.CheckButton disabled={isEmailValid} onClick={handleCheckEmailDuplicate}>중복확인</S.CheckButton>
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  <S.Input
                    style={{
                      backgroundColor: toggle || isPhoneValid ? '#C6C6C6' : '#CAA969', border: 'none', color: 'white', width: '72px',
                    }}
                    type="button"
                    // value="인증하기"
                    value={isPhoneValid ? '인증완료' : '인증하기'}
                    onClick={onClick}
                    disabled={toggle || isPhoneValid}
                  />
                </S.CheckContainer>
                <S.CheckContainer>
                  { toggle
                    ? (
                      <div style={{
                        display: 'flex', alignItems: 'center', width: '326px', position: 'relative',
                      }}
                      >
                        <S.Input
                          // style={{ width: '72px' }}
                          type="text"
                          value={certification}
                          onChange={(e) => setCertifiation(e.target.value)}
                          placeholder="인증번호 입력"
                        />
                        <S.Time>{convertMinutes(time)}</S.Time>
                        <S.Input
                          style={{
                            backgroundColor: '#CAA969', border: 'none', color: 'white', width: '72px',
                          }}
                          type="button"
                          value="인증 확인"
                          onClick={CheckPhone}
                        />
                      </div>
                    )
                    : (
                      <div>{}</div>
                    )}
                </S.CheckContainer>
              </div>
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
