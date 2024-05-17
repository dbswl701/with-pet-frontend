import React from 'react';
import * as S from './RadioButton.styles';

function RadioButton({ onChange, checked }) {
  return (
    <S.RadioContainer>
      <S.RadioInput
        id="O"
        value="true"
        onChange={onChange}
        checked={checked === 'true'}
      />
      {/* <S.Label2 htmlFor="O" style={{ border: '1px solid #CAA969' }}>흡연</S.Label2> */}
      <S.Label2 htmlFor="O">흡연</S.Label2>
      <S.RadioInput
        id="X"
        value="false"
        onChange={onChange}
        checked={checked === 'false'}
      />
      <S.Label2 htmlFor="X">비흡연</S.Label2>
    </S.RadioContainer>
  );
}

export default RadioButton;
