/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function IntroUpdate({
  register, errors, trigger,
}) {
  const handleTrigger = () => {
    trigger('introduction');
  };
  return (
    <div>
      <S.Title>소개글</S.Title>
      <S.IntroTextField name="introduction" {...register('introduction', { required: true })} onBlur={handleTrigger} />
      {
        errors.introduction && <S.ErrorMsg>{errors.introduction.message}</S.ErrorMsg>
      }
    </div>
  );
}

export default IntroUpdate;
