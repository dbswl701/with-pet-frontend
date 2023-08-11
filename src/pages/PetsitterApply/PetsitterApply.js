import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormContainer, StyledInput } from './ApplyStyle';
import camera from '../../assets/camera.png';

const Container = styled.div`
  border: 1px solid #999999;
  width: 1500px;
`;

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
    // console.log(e.target.files);
    // if (e.target.files) {
    console.log(option);
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
  console.log(info);
  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">1. 기본 정보</Typography>
        <Container>
          <p>1. 생년월일</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={info.applicantBirth} onChange={(date) => onChange(date, 'birth')} name="applicantBirth" format="YYYY/MM/DD" />
          </LocalizationProvider>
          <div className="select">
            <p>2. 흡연 여부</p>
            <input
              type="radio"
              name="applicantIsSmoking"
              id="O"
              value="true"
              onChange={onChange}
              checked={info.applicantIsSmoking === 'true'}
            />
            <label htmlFor="O">O</label>
            <input
              type="radio"
              name="applicantIsSmoking"
              id="X"
              value="false"
              onChange={onChange}
              checked={info.applicantIsSmoking === 'false'}
            />
            <label htmlFor="X">X</label>
          </div>
          <div className="select">
            <p>3. 성별</p>
            <input
              type="radio"
              name="applicantGender"
              id="female"
              value="female"
              onChange={onChange}
              checked={info.applicantGender === 'female'}
            />
            <label htmlFor="female">여성</label>
            <input
              type="radio"
              name="applicantGender"
              id="male"
              value="male"
              onChange={onChange}
              checked={info.applicantGender === 'male'}
            />
            <label htmlFor="male">남성</label>
          </div>
        </Container>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">2. 반려 경험 및 경력</Typography>
        <Container>
          <div className="select">
            <p>1. 강아지 반려 경험 유무</p>
            <input
              type="radio"
              name="applicantHavingWithPet"
              id="having"
              value="true"
              onChange={onChange}
              checked={info.applicantHavingWithPet === 'true'}
            />
            <label htmlFor="having">O</label>
            <input
              type="radio"
              name="applicantHavingWithPet"
              id="not"
              value="false"
              onChange={onChange}
              checked={info.applicantHavingWithPet === 'false'}
            />
            <label htmlFor="not">X</label>
          </div>
          <TextField sx={{ m: 1 }} label="2. 반려 동물 관련 경력 또는 경험" variant="outlined" name="applicantAnimalCareer" onChange={onChange} value={info.applicantAnimalCareer} required />
        </Container>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">3. 기타 정보</Typography>
        <Container>
          <TextField sx={{ m: 1 }} label="1. 지원 동기" variant="outlined" name="applicantMotivation" onChange={onChange} value={info.applicantMotivation} required />
          <p>2. 자격증</p>
          <div style={{
            width: '180px', height: '150px', overflow: 'hidden', display: 'flex', justifyContent: 'center', margin: 'auto',
          }}
          >
            { info.applicantLicenseImg ? (
              <img alt="이미지 미리 보기" src={info.applicantLicenseImg} style={{ width: '300px' }} />
            ) : (
              <img alt="이미지 미리 보기" src={camera} style={{ width: '100%', height: 'auto' }} />
            )}
          </div>
          <label htmlFor="image-select" style={{ display: 'flex', justifyContent: 'center', padding: '5px' }}>
            <p style={{ color: '#caa969', border: '1px solid #caa969', display: 'block' }}>사진 등록하기</p>
          </label>
          <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} name="applicantLicenseImg" onChange={(e) => onChange(e, 'img')} />
        </Container>

        <StyledInput style={{ margin: 'auto', width: '200px', marginTop: '30px' }} type="submit" value="제출" />
      </FormContainer>
    </>
  );
}

export default PetsitterApply;
