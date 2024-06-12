import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function Item({
  isIncluded, price, serviceImg, serviceName, serviceIntroduction,
}) {
  console.log(serviceName, '가격:', price);
  return (
    <S.AddedServiceContainer isIncluded={isIncluded}>
      <S.ServiceInnerContainer>
        <S.ServiceImg src={serviceImg} alt="서비스 이미지" />
        <S.ServiceIntroContainer>
          <S.ServiceTitle>{serviceName}</S.ServiceTitle>
          <S.ServiceIntro>{serviceIntroduction}</S.ServiceIntro>
        </S.ServiceIntroContainer>
      </S.ServiceInnerContainer>
      <S.ServicePriceContainer>
        <S.ServicePriceInput type="number" value={price} disabled={isIncluded} />
      </S.ServicePriceContainer>
    </S.AddedServiceContainer>
  );
}

export default Item;
