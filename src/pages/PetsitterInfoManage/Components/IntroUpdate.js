/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function IntroUpdate({
  register, errors, trigger,
}) {
  const handleTrigger = () => {
    trigger('petSitterIntroduction');
  };
  return (
    <div>
      <S.Title>소개글</S.Title>
      <S.IntroTextField name="petSitterIntroduction" {...register('petSitterIntroduction', { required: true })} onBlur={handleTrigger} />
      {
        errors.petSitterIntroduction && <S.ErrorMsg>{errors.petSitterIntroduction.message}</S.ErrorMsg>
      }
    </div>
  );
}

export default IntroUpdate;
