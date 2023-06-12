import React from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Button } from './InfoStyle';

function PetsitterInfoModifyIntro({ introduction, setIntroduction }) {
  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-intro', { introduction }, { withCredentials: true })
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center', position: 'relative', marginTop: '100px',
    }}
    >
      <TextField multiline rows={5} sx={{ m: 1, width: '400px', height: '200px' }} variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
      <Button onClick={onSubmit}>저장</Button>
    </div>
  );
}

export default PetsitterInfoModifyIntro;
