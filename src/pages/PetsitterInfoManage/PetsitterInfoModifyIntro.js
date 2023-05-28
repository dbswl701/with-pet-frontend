import React from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function PetsitterInfoModifyIntro({ introduction, setIntroduction }) {
  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-intro', { introduction }, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField multiline sx={{ m: 1, width: '1000px' }} variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
      <button onClick={onSubmit}>저장하기</button>
    </div>
  );
}

export default PetsitterInfoModifyIntro;
