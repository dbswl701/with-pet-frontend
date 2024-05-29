import React from 'react';
import * as S from '../PetsitterInfoManage.styles';

function ServiceItem({
  isIncluded, serviceImg, serviceName, serviceIntroduction, price, serviceId, onRemove, onAdd,
}) {
  console.log('price:', price);
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
        {
          isIncluded ? <S.ServicePriceBtn type="button" value="삭제" onClick={() => onRemove(serviceId)} />
            : <S.ServicePriceBtn type="button" value="추가" onClick={() => onAdd(serviceId, price, serviceName)} />
        }

      </S.ServicePriceContainer>
    </S.AddedServiceContainer>
  );
}

export default ServiceItem;
