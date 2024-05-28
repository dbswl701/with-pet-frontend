import React, { useState } from 'react';
import * as S from '../PetsitterInfoManage.styles';

function NotAddedService({
  serviceImg, serviceName, serviceIntroduction, serviceId, onAdd,
}) {
  const [price, setPrice] = useState(0);
  console.log(serviceImg, serviceName, serviceIntroduction, serviceId);
  return (
    <S.ServiceItem>
      <S.ServiceInnerContainer>
        <S.ServiceImg src={serviceImg} alt="서비스 이미지" />
        <S.ServiceIntroContainer>
          <S.ServiceTitle>{serviceName}</S.ServiceTitle>
          <S.ServiceIntro>{serviceIntroduction}</S.ServiceIntro>
        </S.ServiceIntroContainer>
      </S.ServiceInnerContainer>
      <S.ServicePriceContainer>
        <S.ServicePriceInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <S.ServicePriceBtn type="button" value="추가" onClick={() => onAdd(serviceId, price, serviceName)} />
      </S.ServicePriceContainer>
    </S.ServiceItem>
  );
}

export default NotAddedService;
/*
  <div style={{ textAlign: 'center' }}>
    <img src={serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px' }} />
  </div>
  <div>
    <p>{serviceName}</p>
    <p>{serviceIntroduction}</p>
  </div>
  <div style={{ textAlign: 'center' }}>
    <input style={{ width: '80%', marginBottom: '3px' }} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
    <InputButton type="button" value="추가" onClick={() => onAdd(serviceId, price, serviceName)} />
  </div>
*/
