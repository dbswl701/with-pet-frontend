import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Item({ service }) {
  return (
    <>
      <div style={{ backgroundColor: `${service.isIncluded === true ? 'pink' : 'gray'}` }}>
        {/* 사진, 이름, 내용 */}
        <img src={service.serviceImg} alt="서비스 이미지" />
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
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
        console.log(res.data.result);
        console.log(res.data.result.introduction === null);
        setInfo(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  console.log(info);
  console.log(info.withPetServices);
  console.log(info.petSitterServices);
  const onModify = () => {
    navigate('../petsitterInfoManage');
  };

  const isServiceIdIncluded = info.withPetServices && info.withPetServices.map((service) => {
    return {
      ...service,
      isIncluded: info.petSitterServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
    };
  });

  console.log(isServiceIdIncluded);

  const showInfo = (
    <>
      <p>펫시터 정보 관리 페이지</p>
      <div style={{ backgroundColor: 'red' }}>
        <p>집사진</p>
        {
          info.petSitterHouses && info.petSitterHouses.map((img) => {
            return <img key={img.houseId} src={img.houseImg} alt="집사진" />;
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
        {
          // info.petSitterServices && info.petSitterServices.length === 0 ? { showNoSelect } : <p>와아</p>
          // info.withPetServices && info.withPetServices.map((service) => <Item key={service.serviceId} service={service} />)
          isServiceIdIncluded && isServiceIdIncluded.map((service) => {
            // console.log(service);
            // console.log(info.petSitterServices);
            return <Item key={service.serviceId} service={service} />;
          })
        }
        <button onClick={onModify}>수정하기</button>
      </div>
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
