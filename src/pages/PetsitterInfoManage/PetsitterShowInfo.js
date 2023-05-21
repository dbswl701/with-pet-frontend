import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Item({ service }) {
  return (
    <>
      <div style={{ backgroundColor: `${service.isIncluded === true ? 'pink' : 'gray'}`, width: '300px', marginRight: '20px' }}>
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
        // console.log(res.data.result);
        setInfo(res.data.result);
        // console.log(res.data.result);
        // console.log(res.data.result.introduction === null);
        setInfo(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  // console.log(info);
  // console.log(info.withPetServices);
  // console.log(info.petSitterServices);
  const onModify = () => {
    navigate('../petsitterInfoManage');
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
  // console.log(isServiceIdIncluded);

  const isCriticalServiceIdIncluded = info.criticalServices && info.criticalServices.map((service) => {
    return {
      ...service,
      isIncluded: info.petSitterCriticalServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
    };
  });

  // console.log(isServiceIdIncluded);

  const showInfo = (
    <>
      <p>펫시터 정보 관리 페이지</p>
      <div style={{ backgroundColor: 'red' }}>
        <p>집사진</p>
        {
          info.petSitterHouses && info.petSitterHouses.map((img) => {
            return <img key={img.houseId} src={img.houseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />;
          })
        }
      </div>
      <div style={{ backgroundColor: 'yellow' }}>
        <p>해시태그</p>
        {
          info.petSitterHashTags && info.petSitterHashTags.map((tag) => {
            return <p key={tag.petSitterHashTagId}>#{tag.hashTagName}</p>;
          })
        }
      </div>

      <div style={{ backgroundColor: 'green' }}>
        <p>소개글</p>
        <p>{info.introduction}</p>
      </div>

      <div style={{ backgroundColor: 'orange' }}>
        <p>자격증</p>
        <img src={info.petSitterLicenseImg} alt="자격증 사진" />
      </div>

      <div style={{ backgroundColor: 'blue' }}>
        <p>이용 가능 서비스</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isServiceIdIncluded && isServiceIdIncluded.map((service) => {
              return <Item key={service.serviceId} service={service} />;
            })
          }
        </div>
      </div>
      <div style={{ backgroundColor: 'blue' }}>
        <p>필수 서비스</p>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => {
              return <Item key={service.serviceId} service={service} />;
            })
          }
        </div>
      </div>
      <button onClick={onModify}>수정하기</button>
    </>
  );

  return (
    <>
      { showInfo }
      {/* {info} */}
    </>
  );
}

export default PetsitterShowInfo;
