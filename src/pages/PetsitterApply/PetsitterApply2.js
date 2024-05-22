import React, { useState } from 'react';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useNavigate } from 'react-router-dom';
import * as S from './PetsitterApply2.styles';
import RadioButton from '../../components/RadioButton/RadioButton';
import PostFileUpload from '../../services/upload';
import postPetsitterApplicants from '../../services/user';

function PetsitterApply2() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    animalCareer: '',
    birth: '',
    gender: '',
    havingWithPet: '',
    isSmoking: '',
    licenseImg: '',
    motivation: '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  // 이미지 변경
  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);

    try {
      const res = await PostFileUpload(formData);
      setInfo({
        ...info,
        licenseImg: res.data.result[0],
      });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await postPetsitterApplicants(info);
    // eslint-disable-next-line no-alert
    alert('펫시터 지원이 완료되었습니다.');
    navigate('../');
  };
  console.log('info:', info);
  return (
    <S.Wrapper onSubmit={onSubmit}>
      <S.SubTitle>1. 기본 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 생년월일</p>
          <S.BirthInput placeholder="ex) 930101" />
          <S.Description>05년생부터(만 18세 이상) 펫시터 지원이 가능합니다. </S.Description>
          <S.ErrorMSG>에러</S.ErrorMSG>
        </div>
        <div>
          <p>2. 흡연 여부</p>
          <RadioButton onChange={onChange} name="isSmoking" checked={info.isSmoking} first="흡연" second="비흡연" />
          <S.Description>직업 특성상 흡연을 하시는 경우, 펫시터 활동이 어려울 수 있습니다.</S.Description>
        </div>
        <div>
          <p>3. 성별</p>
          <RadioButton onChange={onChange} name="gender" checked={info.gender} first="여성" second="남성" />
        </div>
      </S.Container>
      <S.SubTitle>2. 반려 경험 및 경력</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 강아지 반려 경험 유무</p>
          <RadioButton onChange={onChange} name="havingWithPet" checked={info.havingWithPet} first="O" second="X" />
        </div>
        <div>
          <p>2. 반려 동물 관련 경력 또는 경험</p>
          <S.TextArea placeholder="반려 동물 관련 경력 또는 경험에 대해서 알려주세요." />
        </div>
      </S.Container>
      <S.SubTitle>3. 기타 정보</S.SubTitle>
      <S.Container>
        <div>
          <p>1. 지원 동기</p>
          <S.TextArea placeholder="지원 동기에 대해 작성해주세요." />
        </div>
        <div>
          <p>2. 자격증</p>
          <label htmlFor="image-select" style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px' }}>
            <div style={{ }}>
              { info.licenseImg ? (
                <img
                  alt="이미지 미리 보기"
                  src={info.licenseImg}
                  style={{
                    width: '320px', height: '180px', border: '1px solid #CAA969', borderRadius: '10px',
                  }}
                />
              ) : (
                // <svg data-testid="CameraAltIcon" />
                <div style={{
                  backgroundColor: '#CAA969', opacity: '15%', display: 'flex', width: '320px', height: '180px', borderRadius: '10px',
                }}
                >
                  <CameraAltIcon style={{ margin: 'auto', width: '96px', height: '96px' }} />
                </div>
                // <img alt="이미지 미리 보기" src={CameraAltIcon} style={{ width: '100%', height: 'auto' }} />
              )}
            </div>
            {/* <p style={{ color: '#caa969', border: '1px solid #caa969', display: 'block' }}>사진 등록하기</p> */}
          </label>
          <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} name="licenseImg" onChange={handleImageUpload} />
        </div>
      </S.Container>
      <S.SubmitBtn>제출</S.SubmitBtn>
    </S.Wrapper>
  );
}

export default PetsitterApply2;
