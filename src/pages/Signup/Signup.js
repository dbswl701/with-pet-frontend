/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './Signup.styles';
import PostSignUp from '../../services/auth';
import PostFileUpload from '../../services/upload';
import baseProfile from '../../constants/image';
import { getIssuance, PostAuthentication, PostEmailDuplicate } from '../../services/sms';
import { signUpSchema } from '../../schemas/signup.schemas';

function SignupForm() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    getValues,
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  // 에러 검증
  // const isError = Object.keys(errors).length !== 0;

  const navigate = useNavigate();

  const [imageSrc, setImageSrc] = useState(baseProfile);
  const [addressRoad, setAddressRoad] = useState('');
  const [addressPost, setAddressPost] = useState('');
  const [certification, setCertifiation] = useState('');
  const [toggle, setToggle] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false); // 이메일 중복 검사
  const [time, setTime] = useState(180); // 시간 확인
  const [isPhoneValid, setIsPhoneValid] = useState(false); // 휴대폰 인증

  // 전화번호 인증 타이머
  useEffect(() => {
    let intervalId;

    if (toggle && time > 0) {
      intervalId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0 || !toggle) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [toggle, time]);

  const onSubmit = async () => {
    const email = getValues('email');
    const name = getValues('name');
    const password = getValues('password');
    const passwordConfirm = getValues('passwordCheck');
    const phone = getValues('phone');
    const addressDtail = getValues('detailAddr');
    const requestBody = {
      email,
      name,
      password,
      passwordConfirm,
      phone,
      addressPost,
      addressRoad,
      addressDtail,
      imageSrc,
    };

    try {
      await PostSignUp(requestBody);
      alert('회원가입에 성공했습니다.');
      navigate('/login');
    } catch (err) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 주소
  const onAddressDetail = (detail) => {
    setValue('detailAddr', detail);
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

  // 사진
  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);

    try {
      const result = await PostFileUpload(formData);
      setImageSrc(result.data.result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  // 전화번호 인증번호 발급
  const handleIssuance = async () => {
    const phone = getValues('phone');
    try {
      await getIssuance(phone);
      setToggle(true);
      alert('인증번호가 발급되었습니다.');
      setTime(180);
      setCertifiation('');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert(err.response.data.message);
      }
    }
  };

  // 전화번호 인증 확인
  const CheckPhone = async () => {
    const phone = getValues('phone');
    try {
      const res = await PostAuthentication(certification, phone);
      setIsPhoneValid(true);
      alert(res.result);
      setToggle(false);
    } catch (err) {
      alert('인증번호가 일치하지 않습니다.');
      console.log('err:', err);
    }
  };

  const handleCheckEmailDuplicate = async () => {
    const email = getValues('email'); // 이메일 값 얻기
    // 유효한 이메일 형식이 아니면 막는다
    if (!email || errors.email) {
      return;
    }
    try {
      const res = await PostEmailDuplicate(email);
      setIsEmailValid(true);
      alert(res.result);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

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
            <img src={imageSrc} alt="프로필 사진 미리보기" />
            <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={handleImageUpload} />
            <label htmlFor="image-select">
              <S.ModifyIcon className="material-symbols-outlined">
                edit
              </S.ModifyIcon>
            </label>
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
                      value={field.value || ''}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setIsEmailValid(false);
                      }}
                    />
                  )}
                />
                <S.CheckButton type="button" disabled={isEmailValid} onClick={handleCheckEmailDuplicate}>중복확인</S.CheckButton>
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
                    maxLength={13}
                    {...register('phone', { require: true })}
                    placeholder="010-1234-5678"
                  />
                  <S.Input
                    style={{
                      backgroundColor: toggle || isPhoneValid ? '#C6C6C6' : '#CAA969', border: 'none', color: 'white', width: '72px',
                    }}
                    type="button"
                    value={isPhoneValid ? '인증완료' : '인증하기'}
                    onClick={handleIssuance}
                    disabled={toggle || isPhoneValid}
                  />
                </S.CheckContainer>
                <S.CheckContainer>
                  { toggle
                    ? (
                      <div>
                        <div style={{
                          display: 'flex', alignItems: 'center', width: '326px', position: 'relative',
                        }}
                        >
                          <S.Input
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
                        <div>
                          <S.Reissuance onClick={handleIssuance}>재발급</S.Reissuance>
                        </div>
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

          <S.InputContainerWrapper>
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
                  />
                  <S.CheckButton type="button" onClick={openPostcodeSearch}>주소검색</S.CheckButton>
                </S.CheckContainer>

                <S.Input
                  type="text"
                  value={addressRoad}
                  readOnly
                  placeholder="도로명 주소"
                />

                <S.Input
                  type="text"
                  placeholder="상세주소"
                  {...register('detailAddr', { require: true })}
                />
              </S.AddressContainer>
            </S.InputContainer>
            {errors.detailAddr && <S.ErrorMessage>{errors.detailAddr.message}</S.ErrorMessage>}
          </S.InputContainerWrapper>
          <S.Button type="submit">회원가입</S.Button>
        </S.Form>
      </S.Container>
    </>
  );
}

export default SignupForm;
