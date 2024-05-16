import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import * as S from './PetssiterApply.styles';
import { FormContainer, StyledInput } from './PetssiterApply.styles';
// import camera from '../../assets/camera.png';

function PetsitterApply() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    applicantAnimalCareer: '',
    applicantBirth: '',
    applicantGender: '',
    applicantHavingWithPet: '',
    applicantIsSmoking: '',
    applicantLicenseImg: '',
    applicantMotivation: '',
  });

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setInfo({
          ...info,
          applicantLicenseImg: res.data.result[0],
        });
      });
  };
  const onChange = (e, option) => {
    if (option === 'img') {
      handleImageUpload(e);
    } else if (option === 'birth') {
      setInfo({
        ...info,
        applicantBirth: dayjs(e).format('YYYY-MM-DD'),
      });
    } else {
      const { value, name } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post('https://withpet.site/api/v2/applicants', info, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('펫시터 지원이 완료되었습니다.');
        navigate('../');
      })
      .catch(() => {
      });
  };
  // console.log(info);
  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <div style={{ marginTop: '50px' }}>
          <S.Title component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">1. 기본 정보</S.Title>
          <S.Container>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '100px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>1. 생년월일</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker value={info.applicantBirth} onChange={(date) => onChange(date, 'birth')} name="applicantBirth" format="YYYY/MM/DD" />
                </LocalizationProvider>
              </div>

              <div style={{ marginLeft: '437px' }}>
                <p>2. 흡연 여부</p>
                <input
                  type="radio"
                  name="applicantIsSmoking"
                  id="O"
                  value="true"
                  onChange={onChange}
                  checked={info.applicantIsSmoking === 'true'}
                  style={{ display: 'none' }}
                />
                <S.Label htmlFor="O" style={{ border: '1px solid #CAA969' }}>흡연</S.Label>
                <input
                  type="radio"
                  name="applicantIsSmoking"
                  id="X"
                  value="false"
                  onChange={onChange}
                  checked={info.applicantIsSmoking === 'false'}
                  style={{ display: 'none' }}
                />
                <S.Label htmlFor="X" style={{ border: '1px solid #CAA969' }}>비흡연</S.Label>
              </div>
            </div>

            <div>
              <p>3. 성별</p>
              <input
                type="radio"
                name="applicantGender"
                id="female"
                value="female"
                onChange={onChange}
                checked={info.applicantGender === 'female'}
                style={{ display: 'none' }}
              />
              <S.Label htmlFor="female" style={{ border: '1px solid #CAA969' }}>여성</S.Label>
              <input
                type="radio"
                name="applicantGender"
                id="male"
                value="male"
                onChange={onChange}
                checked={info.applicantGender === 'male'}
                style={{ display: 'none' }}
              />
              <S.Label htmlFor="male" style={{ border: '1px solid #CAA969' }}>남성</S.Label>
            </div>
          </S.Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <S.Title component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">2. 반려 경험 및 경력</S.Title>
          <S.Container>
            <div style={{ marginBottom: '100px' }}>
              <p>1. 강아지 반려 경험 유무</p>
              <input
                type="radio"
                name="applicantHavingWithPet"
                id="having"
                value="true"
                onChange={onChange}
                checked={info.applicantHavingWithPet === 'true'}
                style={{ display: 'none' }}
              />
              <S.Label htmlFor="having" style={{ border: '1px solid #CAA969' }}>O</S.Label>
              <input
                type="radio"
                name="applicantHavingWithPet"
                id="not"
                value="false"
                onChange={onChange}
                checked={info.applicantHavingWithPet === 'false'}
                style={{ display: 'none' }}
              />
              <S.Label htmlFor="not" style={{ border: '1px solid #CAA969' }}>X</S.Label>
            </div>
            <p>2. 반려 동물 관련 경력 또는 경험</p>
            <TextField style={{ width: '1190px' }} rows={8} placeholder="반려 동물 관련 경력 또는 경험에 대해서 알려주세요." variant="outlined" multiline name="applicantAnimalCareer" onChange={onChange} value={info.applicantAnimalCareer} required />
          </S.Container>
        </div>
        <div style={{ marginTop: '50px' }}>
          <S.Title component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">3. 기타 정보</S.Title>
          <S.Container>
            <div style={{ marginBottom: '100px' }}>
              <p>1. 지원동기</p>
              <TextField style={{ width: '1190px' }} rows={8} placeholder="이곳에 직접 입력해주세요." multiline variant="outlined" name="applicantMotivation" onChange={onChange} value={info.applicantMotivation} required />
            </div>
            <p>2. 자격증</p>

            <label htmlFor="image-select" style={{ display: 'flex', justifyContent: 'flex-start', padding: '5px' }}>
              <div style={{ }}>
                { info.applicantLicenseImg ? (
                  <img
                    alt="이미지 미리 보기"
                    src={info.applicantLicenseImg}
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
            <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} name="applicantLicenseImg" onChange={(e) => onChange(e, 'img')} />
          </S.Container>
        </div>

        <StyledInput style={{ margin: '60px auto', width: '302px', marginTop: '72px' }} type="submit" value="제출" />
      </FormContainer>
    </>
  );
}

export default PetsitterApply;
