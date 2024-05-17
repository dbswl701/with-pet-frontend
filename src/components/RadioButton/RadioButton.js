import React from 'react';
import * as S from './RadioButton.styles';

function RadioButton({
  onChange, name, checked, first, second,
}) {
  return (
    <S.RadioContainer>
      <S.RadioInput
        id={`${name}_O`}
        value="true"
        onChange={onChange}
        checked={checked === 'true'}
        name={name}
      />
      <S.Label2 htmlFor={`${name}_O`}>{first}</S.Label2>
      <S.RadioInput
        id={`${name}_X`}
        value="false"
        onChange={onChange}
        checked={checked === 'false'}
        name={name}
      />
      <S.Label2 htmlFor={`${name}_X`}>{second}</S.Label2>
    </S.RadioContainer>
  );
}

export default RadioButton;
