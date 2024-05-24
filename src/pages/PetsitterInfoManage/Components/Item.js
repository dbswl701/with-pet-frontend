import React from 'react';

function Item({ service }) {
  return (
    <div style={{
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : '#F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '150px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '12px',
    }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px', marginTop: '5px' }} />
      </div>
      <div style={{ paddingLeft: '5px' }}>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
        <p>{service.price ? `가격 : ${service.price}원` : null}</p>
      </div>
    </div>
  );
}

export default Item;
