import React from 'react';
import { InputButton } from '../InfoStyle';

function Item1({ service, onRemove }) {
  const includeed = (
    <div style={{
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : '#F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
    }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px', marginTop: '5px' }} />
      </div>
      <div style={{ paddingLeft: '5px' }}>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
        <p>가격: {service.price}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InputButton type="button" value="삭제" onClick={() => onRemove(service.serviceId)} />
      </div>
    </div>
  );

  return (
    <>
      { includeed }
    </>
  );
}

export default Item1;
