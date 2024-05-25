import React, { useState } from 'react';
import { InputButton } from '../PetsitterInfoManage.styles';

function Item2({ service, onAdd }) {
  const [price, setPrice] = useState(0);
  const notIncluded = (
    <div
      style={{
        cursor: 'pointer', backgroundColor: '#F2F2F2', width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px' }} />
      </div>
      <div>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <input style={{ width: '80%', marginBottom: '3px' }} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <InputButton type="button" value="추가" onClick={() => onAdd(service.serviceId, price, service.serviceName)} />
      </div>
    </div>
  );

  return (
    <>
      { notIncluded }
    </>
  );
}

export default Item2;
