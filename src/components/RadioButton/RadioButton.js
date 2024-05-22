/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as S from './RadioButton.styles';

function RadioButton({
  // onChange, name, checked, first, second,
  register, name, first, second,

}) {
  return (
    <S.RadioContainer>
      <S.RadioInput
        id={`${name}_O`}
        value={name === 'gender' ? 'FEMALE' : 'true'}
        {...register}
      />
      <S.Label2 htmlFor={`${name}_O`}>{first}</S.Label2>
      <S.RadioInput
        id={`${name}_X`}
        value={name === 'gender' ? 'MALE' : 'false'}
        {...register}
      />
      <S.Label2 htmlFor={`${name}_X`}>{second}</S.Label2>
    </S.RadioContainer>
  );
}

export default RadioButton;
