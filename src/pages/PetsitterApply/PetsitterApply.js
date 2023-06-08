import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormContainer, StyledInput } from './ApplyStyle';

function PetsitterApply() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    applicant_animal_career: '',
    applicant_care_experience: '',
    applicant_having_with_pet: '',
    applicant_identification: '',
    applicant_is_smoking: '',
    applicant_license_img: '',
    applicant_motivate: '',
    applicant_petsitter_career: '',
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
          applicant_license_img: res.data.result[0],
        });
      });
  };
  // console.log(imageSrc);
  const onChange = (e) => {
    if (e.target.files) {
      handleImageUpload(e);
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
    axios.post('https://withpet.site/api/v1/users/applicate-petsitter', info, { withCredentials: true })
      .then(() => {
        navigate('../');
      })
      .catch(() => {
      });
  };

  return (
    <>
      <FormContainer onSubmit={onSubmit}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom sx={{ color: '#caa969' }} align="left">기본 정보</Typography>
        <TextField sx={{ m: 1 }} label="1. 지원 동기" variant="outlined" name="applicant_motivate" onChange={onChange} value={info.applicant_motivate} required />
        <TextField sx={{ m: 1 }} label="2. 펫시터 경력" variant="outlined" name="applicant_petsitter_career" onChange={onChange} value={info.applicant_petsitter_career} required />
        <TextField sx={{ m: 1 }} label="3. 주민등록번호" variant="outlined" name="applicant_identification" maxLength="6" onChange={onChange} value={info.applicant_identification} required />
        <div className="select2">
          <p>4. 흡연 여부</p>
          <input type="radio" name="applicant_is_smoking" id="true" value="true" onChange={onChange} checked={info.applicant_is_smoking === 'true'} required />
          <label htmlFor="male">O</label>
          <input type="radio" name="applicant_is_smoking" id="false" value="false" onChange={onChange} checked={info.applicant_is_smoking === 'false'} />
          <label htmlFor="female">X</label>
        </div>
        <div className="select2">
          {/* <input className="radio" type="radio" name="applicant_having_with_pet" id="true" value="true" onChange={onChange} checked={info.applicant_having_with_pet === 'true'} required />
          <label htmlFor="male">O</label>
          <input className="radio" type="radio" name="applicant_having_with_pet" id="false" value="false" onChange={onChange} checked={info.applicant_having_with_pet === 'false'} />
          <label htmlFor="female">X</label> */}
        </div>
        <TextField sx={{ m: 1 }} label="6. 타인의 반려 동물을 돌봐준 경험" variant="outlined" name="applicant_care_experience" onChange={onChange} value={info.applicant_care_experience} required />
        {/* <label className="radio" htmlFor="image-select">6. 자격증 등록</label>
        <img id="preview-image" alt="이미지 미리보기" src={info.applicant_license_img} />
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} name="applicant_license_img" onChange={onChange} /> */}
        <label className="radio" htmlFor="image-select">6. 자격증 등록</label>
        <div style={{ width: '180px', height: '150px', overflow: 'hidden' }}>
          <img id="preview-image" alt="이미지 미리 보기" src={info.applicant_license_img} style={{ width: '100%', height: 'auto' }} />
        </div>
        <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} name="applicant_license_img" onChange={onChange} />
        <TextField sx={{ m: 1 }} label="7. 반려 동물을 키워본 경험" variant="outlined" name="applicant_animal_career" onChange={onChange} value={info.applicant_animal_career} required />
        <StyledInput type="submit" value="제출" />
      </FormContainer>
    </>
  );
}

export default PetsitterApply;
