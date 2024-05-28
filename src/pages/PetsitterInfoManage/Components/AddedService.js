import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function AddedService({
  isIncluded, serviceImg, serviceName, serviceIntroduction, price, serviceId, onRemove,
}) {
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
        <S.ServicePriceInput type="number" value={price} disabled />
        <S.ServicePriceBtn type="button" value="삭제" onClick={() => onRemove(serviceId)} />
      </S.ServicePriceContainer>
    </S.AddedServiceContainer>
  );
}

export default AddedService;
