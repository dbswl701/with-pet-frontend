import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function BasicInfo({ info, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>기본 정보</Typography>
      <TextField sx={{ m: 1 }} label="1. 강아지 반려 경험 " variant="outlined" name="applicant_animal_career" onChange={onChange} value={info.applicant_animal_career} required />
      <TextField sx={{ m: 1 }} label="3. 현재 반려견와 같이 지내는지" variant="outlined" name="applicant_having_with_pet" onChange={onChange} value={info.applicant_having_with_pet} required />
      <TextField sx={{ m: 1 }} label="4. 주민등록번호" variant="outlined" name="applicant_identification" maxlength="6" onChange={onChange} value={info.applicant_identification} required />
      <div className="select2">
        <p>5. 흡연 여부</p>
        <input type="radio" name="applicant_is_smoking" id="true" value="true" onChange={onChange} checked={info.applicant_is_smoking === 'true'} required />
        <label htmlFor="male">수컷</label>
        <input type="radio" name="applicant_is_smoking" id="false" value="false" onChange={onChange} checked={info.applicant_is_smoking === 'false'} />
        <label htmlFor="female">암컷</label>
      </div>
      <img id="preview-image" alt="이미지 미리보기" src={info.applicant_license_img} />
      <label htmlFor="image-select">6. 자격증 등록</label>
      <input type="file" accept="image/*" id="image-select" style={{ display: 'none' }} onChange={onChange} />
      <TextField sx={{ m: 1 }} label="7. 지원 동기" variant="outlined" name="applicant_motivate" onChange={onChange} value={info.applicant_motivate} required />
      <TextField sx={{ m: 1 }} label="2. 타인의 반려동물을 돌봐준 경험" variant="outlined" name="applicant_care_experience" onChange={onChange} value={info.applicant_care_experience} required />
      <TextField sx={{ m: 1 }} label="8. 펫시터 경력" variant="outlined" name="applicant_petsitter_career" onChange={onChange} value={info.applicant_petsitter_career} required />
      <input type="submit" value="제출" />
    </form>
  );
}

// function Career({ info, onChange }) {
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       <TextField sx={{ m: 1 }} label="1. 자격증" variant="outlined" size="small" name="cert_img" onChange={onChange} value={info.cert_img} required />
//       <Typography component="h2" variant="h6" color="primary" gutterBottom>2. 반려 경험 및 경력</Typography>
//       <TextField sx={{ m: 1 }} label="1. 이름" variant="outlined" size="small" name="name" onChange={onChange} value={info.name} required />
//       <TextField sx={{ m: 1 }} label="2. 주민등록번호" variant="outlined" size="small" name="identification" onChange={onChange} value={info.identification} required />
//       <TextField sx={{ m: 1 }} label="3. 흡연 여부" variant="outlined" size="small" name="is_smoking" onChange={onChange} value={info.is_smoking} required />
//       <TextField sx={{ m: 1 }} label="4. 자격증" variant="outlined" size="small" name="cert_img" onChange={onChange} value={info.cert_img} required />
//     </div>
//   );
// }

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
    } else if (e.target.name === 'applicant_identification') {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;
      if (value === 0) return;
      setInfo({
        ...info,
        applicant_identification: value,
      });
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

  const onSubmit = () => {
    axios.post('/api/v1/users/applicate-petsitter', info)
      .then(() => {
      })
      .catch(() => {
      });
    navigate('../');
  };

  return (
    <>
      <div style={{ margin: '0px 400px' }}>
        <BasicInfo info={info} onChange={onChange} onSubmit={onSubmit} />
        {/* <Career /> */}
        {/* <Other /> */}
      </div>
    </>
  );
}

export default PetsitterApply;
