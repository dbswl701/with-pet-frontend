/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './PetsitterApply2.styles';
import RadioButton from '../../components/RadioButton/RadioButton';
import { petsitterApplicantSchema } from '../../schemas/petsitterApplicant.schemas';
import postPetsitterApplicants from '../../services/user';
import PostFileUpload from '../../services/upload';

function PetsitterApply2() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(petsitterApplicantSchema),
    mode: 'onChange',
  });
  const [info, setInfo] = useState({
    animalCareer: '',
    birth: '',
    gender: '',
    havingWithPet: '',
    isSmoking: '',
    licenseImg: '',
    motivation: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [errorImg, setErrorImg] = useState(true);

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 이미지 변경
  const handleImageUpload = async (img) => {
    const formData = new FormData();
    formData.append('file', img);

    try {
      const res = await PostFileUpload(formData);
      setImagePreview(res.data.result[0]);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const licenseImg = watch('licenseImg'); // 'image' 필드를 감시
  useEffect(() => {
    if (licenseImg && licenseImg.length > 0) {
      handleImageUpload(licenseImg[0]);
      setErrorImg(false);
    }
  }, [licenseImg]);

  const onSubmit = async (data) => {
    if (errorImg) return;

    await postPetsitterApplicants({ ...data, licenseImg: imagePreview });
    // eslint-disable-next-line no-alert
    alert('펫시터 지원이 완료되었습니다.');
    navigate('../');
  };

  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <S.SubTitle>1. 기본 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 생년월일</p>
          <S.BirthInput placeholder="ex) 2024-05-22" maxlength="10" {...register('birth', { required: true })} />
          <S.Description>05년생부터(만 18세 이상) 펫시터 지원이 가능합니다. </S.Description>
          {errors.birth && <S.ErrorMSG>{errors.birth.message}</S.ErrorMSG>}
        </div>
        <div>
          <p>2. 흡연 여부</p>
          <RadioButton onChange={onChange} name="isSmoking" checked={info.isSmoking} first="흡연" second="비흡연" register={register('isSmoking', { required: true })} />
          <S.Description>직업 특성상 흡연을 하시는 경우, 펫시터 활동이 어려울 수 있습니다.</S.Description>
          {errors.isSmoking && <S.ErrorMSG>{errors.isSmoking.message}</S.ErrorMSG>}
        </div>
        <div>
          <p>3. 성별</p>
          <RadioButton onChange={onChange} name="gender" checked={info.gender} first="여성" second="남성" register={register('gender', { required: true })} />
          {errors.gender && <S.ErrorMSG>{errors.gender.message}</S.ErrorMSG>}
        </div>
      </S.Container>
      <S.SubTitle>2. 반려 경험 및 경력</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 강아지 반려 경험 유무</p>
          <RadioButton onChange={onChange} name="havingWithPet" checked={info.havingWithPet} first="O" second="X" register={register('havingWithPet', { required: true })} />
          {errors.havingWithPet && <S.ErrorMSG>{errors.havingWithPet.message}</S.ErrorMSG>}
        </div>
        <div>
          <p>2. 반려 동물 관련 경력 또는 경험</p>
          <S.TextArea placeholder="반려 동물 관련 경력 또는 경험에 대해서 알려주세요." {...register('animalCareer', { required: true })} />
          {errors.animalCareer && <S.ErrorMSG>{errors.animalCareer.message}</S.ErrorMSG>}
        </div>
      </S.Container>
      <S.SubTitle>3. 기타 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 지원 동기</p>
          <S.TextArea placeholder="지원 동기에 대해 작성해주세요." {...register('motivation', { required: true })} />
          {errors.motivation && <S.ErrorMSG>{errors.motivation.message}</S.ErrorMSG>}
        </div>
        <div>
          <p>2. 자격증</p>
          <label htmlFor="image-select" style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px' }}>
            <div style={{ }}>
              { imagePreview ? (
                <img
                  alt="이미지 미리 보기"
                  src={imagePreview}
                  style={{
                    width: '320px', height: '180px', border: '1px solid #CAA969', borderRadius: '10px',
                  }}
                />
              ) : (
                <div style={{
                  backgroundColor: '#CAA969', opacity: '15%', display: 'flex', width: '320px', height: '180px', borderRadius: '10px',
                }}
                >
                  <CameraAltIcon style={{ margin: 'auto', width: '96px', height: '96px' }} />
                </div>
              )}
            </div>
            {/* <p style={{ color: '#caa969', border: '1px solid #caa969', display: 'block' }}>사진 등록하기</p> */}
          </label>
          <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} {...register('licenseImg', { required: true })} />
          {errorImg && <S.ErrorMSG>자격증을 등록해주세요.</S.ErrorMSG>}
        </div>
      </S.Container>
      <S.SubmitBtn>제출</S.SubmitBtn>
    </S.Wrapper>
  );
}

export default PetsitterApply2;
