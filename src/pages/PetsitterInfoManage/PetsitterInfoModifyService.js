import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Item1({ service, onRemove }) {
  // 1. 활성화 (isInclude === true)
  const includeed = (
    <div style={{
      // cursor: 'pointer', backgroundColor: '#caa969', width: '300px', marginRight: '20px',
      backgroundColor: `${service.isIncluded === true ? '#FAEBD7' : 'gray'}`, width: '300px', marginRight: '20px', borderRadius: '20px',
    }}
    >
      {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
      <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '100px', height: '100px' }} />
      <p>{service.serviceName}</p>
      <p>{service.serviceIntroduction}</p>
      <p>가격: {service.price}</p>
      <input type="button" value="삭제" onClick={() => onRemove(service.serviceId)} />
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
        cursor: 'pointer', backgroundColor: 'gray', width: '300px', marginRight: '20px', borderRadius: '20px',
      }}
    >
      {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
      <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '100px', height: '100px' }} />
      <p>{service.serviceName}</p>
      <p>{service.serviceIntroduction}</p>
      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <input type="button" value="추가" onClick={() => onAdd(service.serviceId, price)} />
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
  const onRemoveService = (id) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    // console.log(id);
    setServiceSelectList(serviceSelectList.filter((service) => service.serviceId !== id));
  };

  const onAddService = (id, price) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    // console.log(id);
    setServiceSelectList([...serviceSelectList, { serviceId: id, price: parseInt(price, 10) }]);
  };

  const onSubmit = () => {
    axios.put('https://withpet.site/api/v1/petsitter/update-service', { petSitterServiceRequests: serviceSelectList }, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
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
      <button onClick={onSubmit}>저장하기</button>

    </>
  );
}
export default PetsitterInfoModifyService;
