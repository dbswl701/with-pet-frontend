import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Item({ service }) {
  return (
    <>
      <div style={{
        backgroundColor: `${service.isIncluded === true ? '#FAEBD7' : 'gray'}`, width: '300px', marginRight: '20px', borderRadius: '20px',
      }}
      >
        {/* 사진, 이름, 내용 */}
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '100px', height: '100px' }} />
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
        <p>가격: {service.price}</p>
      </div>
    </>
  );
}

function PetsitterShowInfo() {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        setInfo(res.data.result);
        console.log(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  const onModify = () => {
    navigate('../petsitterInfoModify');
  };

  const isServiceIdIncluded = info.withPetServices && info.withPetServices.map((service) => {
    const selected = info.petSitterServices.find((sitterService) => sitterService.serviceId === service.serviceId);
    return {
      ...service,
      isIncluded: info.petSitterServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
      price: selected ? selected.price : null,
    };
  });

  const isCriticalServiceIdIncluded = info.criticalServices && info.criticalServices.map((service) => {
    const selected = info.petSitterServices.find((sitterService) => sitterService.serviceId === service.serviceId);
    return {
      ...service,
      isIncluded: info.petSitterCriticalServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
      price: selected ? selected.price : null,
    };
  });

  const showInfo = (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <h1>펫시터 정보 관리 페이지</h1>
      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <h2>집사진</h2>
        {
          info.petSitterHouses && info.petSitterHouses.map((img) => {
            return <img key={img.houseId} src={img.houseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />;
          })
        }
      </div>
      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <h2>해시태그</h2>
        {
          info.petSitterHashTags && info.petSitterHashTags.map((tag) => {
            return <p key={tag.petSitterHashTagId}>#{tag.hashTagName}</p>;
          })
        }
      </div>

      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <h2>소개글</h2>
        <p>{info.introduction}</p>
      </div>

      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <p>자격증</p>
        <img src={info.petSitterLicenseImg} alt="자격증 사진" />
      </div>

      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <p>이용 가능 서비스</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isServiceIdIncluded && isServiceIdIncluded.map((service) => {
              return <Item key={service.serviceId} service={service} />;
            })
          }
        </div>
      </div>
      <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px' }}>
        <p>필수 서비스</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => {
              return <Item key={service.serviceId} service={service} />;
            })
          }
        </div>
      </div>
      <button onClick={onModify} style={{ height: '50px' }}>수정하기</button>
    </div>
  );

  const initPrint = (
    <div>
      <button onClick={() => navigate('../petsitterInfoManage')}>등록하기</button>
    </div>
  );

  // 만약 펫시터의 정보가 하나도 없다면
  let print = '';
  if (info.introduction === null) {
    print = initPrint;
  } else {
    print = showInfo;
  }

  return (
    <>
      { print }
      {/* {info} */}
    </>
  );
}

export default PetsitterShowInfo;
