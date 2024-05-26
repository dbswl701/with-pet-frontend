import { TextField } from '@mui/material';
import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function IntroUpdate({ introduction, setIntroduction }) {
  return (
    <div>
      <S.Title>소개글</S.Title>
      <TextField multiline rows={3} sx={{ m: 1 }} variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
    </div>
  );
}

export default IntroUpdate;
