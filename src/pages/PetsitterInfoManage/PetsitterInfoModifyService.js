import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputButton, Button } from './InfoStyle';

function Item1({ service, onRemove }) {
  const includeed = (
    <div style={{
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : 'F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '220px', borderRadius: '20px', padding: '10px', fontSize: '12px', justifyContent: 'center', margin: '20px', overflow: 'auto',
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

function Item2({ service, onAdd }) {
  const [price, setPrice] = useState(0);
  const notIncluded = (
    <div
      style={{
        cursor: 'pointer', backgroundColor: '#F2F2F2', color: 'gray', width: '130px', height: '220px', borderRadius: '20px', padding: '10px', fontSize: '12px', justifyContent: 'center', margin: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
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
function PetsitterInfoModifyService({ serviceSelectList, setServiceSelectList, withPetServices }) {
  const [isServiceIdIncluded, setIsServiceIdIncluded] = useState([]);
  useEffect(() => {
    const includedServices = withPetServices && withPetServices.map((service) => {
      const isIncluded = serviceSelectList.some((sitterService) => sitterService.serviceId === service.serviceId);
      const selected = serviceSelectList.find((sitterService) => sitterService.serviceId === service.serviceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsServiceIdIncluded(includedServices);
  }, [serviceSelectList]);
  const onRemoveService = (id) => {
    setServiceSelectList(serviceSelectList.filter((service) => service.serviceId !== id));
  };

  const onAddService = (id, price) => {
    setServiceSelectList([...serviceSelectList, { serviceId: id, price: parseInt(price, 10) }]);
  };

  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-service', { petSitterServiceRequests: serviceSelectList }, { withCredentials: true })
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert(res.data.result);
      })
      .catch(() => {});
  };
  return (
    <>
      <p>이용 가능 서비스</p>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {isServiceIdIncluded && isServiceIdIncluded.map((service) => (service.isIncluded ? (
          <Item1 key={service.serviceId} service={service} onRemove={onRemoveService} />
        ) : (
          <Item2 key={service.serviceId} service={service} onAdd={onAddService} />
        )))}
      </div>
      <Button onClick={onSubmit}>저장</Button>

    </>
  );
}
export default PetsitterInfoModifyService;
