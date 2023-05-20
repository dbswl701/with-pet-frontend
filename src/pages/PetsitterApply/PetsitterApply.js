import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BasicInfo({ info, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>기본 정보</Typography>
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
        <p>5. 강아지 반려 경험 여부</p>
        <input type="radio" name="applicant_having_with_pet" id="true" value="true" onChange={onChange} checked={info.applicant_having_with_pet === 'true'} required />
        <label htmlFor="male">O</label>
        <input type="radio" name="applicant_having_with_pet" id="false" value="false" onChange={onChange} checked={info.applicant_having_with_pet === 'false'} />
        <label htmlFor="female">X</label>
      </div>
      <TextField sx={{ m: 1 }} label="6. 타인의 반려 동물을 돌봐준 경험" variant="outlined" name="applicant_care_experience" onChange={onChange} value={info.applicant_care_experience} required />
      <img id="preview-image" alt="이미지 미리보기" src={info.applicant_license_img} />
      <label htmlFor="image-select">6. 자격증 등록</label>
      <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
      <TextField sx={{ m: 1 }} label="7. applicant_having_with_pet " variant="outlined" name="applicant_animal_career" onChange={onChange} value={info.applicant_animal_career} required />
      <input type="submit" value="제출" />
    </form>
  );
}

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

  const onChange = (e) => {
    if (e.target.files) {
      console.log('img change');
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setInfo({
          ...info,
          applicant_license_img: reader.result,
        });
      };
    } else {
      console.log(info);
      const { value, name } = e.target;
      setInfo({
        ...info,
        [name]: value,
      });
    }
    console.log(info);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(info);
    axios.post('https://withpet.site/api/v1/users/applicate-petsitter', info, { withCredentials: true })
      .then(() => {
        // 성공했다고 알려주고
        navigate('../');
      })
      .catch(() => {
      });
    // navigate('../');
  };

  return (
    <>
      <div style={{ margin: '0px 400px' }}>
        <BasicInfo info={info} onChange={onChange} onSubmit={onSubmit} />

      </div>
    </>
  );
}

export default PetsitterApply;
