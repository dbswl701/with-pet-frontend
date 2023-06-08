import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { InputButton, Button } from './InfoStyle';

function Item1({ service, onRemove }) {
  // 1. 활성화 (isInclude === true)
  const includeed = (
    <div style={{
      // cursor: 'pointer', backgroundColor: '#caa969', width: '300px', marginRight: '20px',
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : '#F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '190px', borderRadius: '20px', padding: '10px', fontSize: '12px', justifyContent: 'center', margin: '20px',
    }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
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

function Item2({ service, onAdd }) {
  const [price, setPrice] = useState(0);
  // 2. 비활성화 (isInclude === false)
  const notIncluded = (
    <div
      style={{
        cursor: 'pointer', backgroundColor: '#F2F2F2', color: 'gray', width: '130px', height: '190px', borderRadius: '20px', padding: '10px', fontSize: '12px', justifyContent: 'center', margin: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px', marginTop: '5px' }} />
      </div>
      <div style={{ paddingLeft: '5px' }}>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
        <input style={{ marginBottom: '6px', width: '100px' }} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <InputButton type="button" value="추가" onClick={() => onAdd(service.serviceId, price)} />
      </div>
    </div>
  );

  return (
    <>
      { notIncluded }
    </>
  );
}

function PetsitterInfoModifyCritical({ criticalServices, criticalSelectList, setCriticalSelectList }) {
  const [isCriticalServiceIdIncluded, setIsCriticalServiceIdIncluded] = useState([]);
  useEffect(() => {
    const includedServices = criticalServices && criticalServices.map((service) => {
      const isIncluded = criticalSelectList.some((sitterService) => sitterService.serviceId === service.serviceId);
      const selected = criticalSelectList.find((sitterService) => sitterService.serviceId === service.serviceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsCriticalServiceIdIncluded(includedServices);
  }, [criticalSelectList]);

  const onRemoveCriticalService = (id) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    setCriticalSelectList(criticalSelectList.filter((service) => service.serviceId !== id));
  };

  const onAddCriticalService = (id, price) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    setCriticalSelectList([...criticalSelectList, { serviceId: id, price: parseInt(price, 10) }]);
  };
  // console.log(criticalSelectList);
  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-criticalservice', { petSitterCriticalServiceRequests: criticalSelectList }, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <>
      <p>필수 서비스</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (service.isIncluded ? (
          <Item1 key={service.serviceId} service={service} onRemove={onRemoveCriticalService} />
        ) : (
          <Item2 key={service.serviceId} service={service} onAdd={onAddCriticalService} />
        )))}
      </div>
      <Button onClick={onSubmit}>저장</Button>
    </>
  );
}

export default PetsitterInfoModifyCritical;
