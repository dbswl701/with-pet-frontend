import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function IntroUpdate({ introduction, setIntroduction }) {
  return (
    <div>
      <S.Title>소개글</S.Title>
      <S.IntroTextField name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
    </div>
  );
}

export default IntroUpdate;
