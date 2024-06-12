import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './PetsitterInfoManage.styles';
import { getPetsitterMyInfo } from '../../services/petsitter';
import Item from './Components/Item';
import InitPage from './Components/InitPage';
// import ServiceItem from './Components/ServiceItem';

function PetsitterShowInfo() {
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getPetsitterMyInfo();
      setInfo(res.data.result);
    };

    fetchData();
  }, []);

  const onModify = () => {
    navigate('../petsitterInfoModify');
  };

  const isServiceIdIncluded = info.withPetServices && info.withPetServices.map((service) => {
    const selected = info.petSitterWithPetServices.find((sitterService) => sitterService.withPetServiceId === service.withPetServiceId);
    return {
      ...service,
      isIncluded: info.petSitterWithPetServices.some(
        (sitterService) => sitterService.withPetServiceId === service.withPetServiceId,
      ),
      price: selected ? selected.petSitterWithPetServicePrice : null,
    };
  });

  const isCriticalServiceIdIncluded = info.criticalServices && info.criticalServices.map((service) => {
    const selected = info.petSitterCriticalServices.find((sitterService) => sitterService.serviceId === service.serviceId);
    return {
      ...service,
      isIncluded: info.petSitterCriticalServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
      price: selected ? selected.price : null,
    };
  });

  console.log('isServiceIdIncluded:', isServiceIdIncluded);

  const showInfo = (
    <S.Container>
      <S.MainTitle className="page">펫시터 정보 관리 페이지</S.MainTitle>
      <S.DivContainer>
        <S.Title>집사진</S.Title>
        <S.HouseImgList>
          {
            info.petSitterHouses && info.petSitterHouses.map((img) => (
              <S.HouseImgContainer key={img}>
                <S.HouseImg key={img.petSitterHouseId} src={img.petSitterHouseImg} alt="집사진" isRepresentative={img.petSitterHouseRepresentative} />
              </S.HouseImgContainer>
            ))
          }
        </S.HouseImgList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>해시태그</S.Title>
        <S.HashTagList>
          {info.petSitterHashTags && info.petSitterHashTags.map((tag) => (
            <S.HashTagItem className="list" key={tag.petSitterHashTagId}>
              <S.HashTag># {tag.petSitterHashTagName}</S.HashTag>
            </S.HashTagItem>
          ))}
        </S.HashTagList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>소개글</S.Title>
        <p>{info.petSitterIntroduction}</p>
      </S.DivContainer>

      <S.DivContainer>
        <S.Title>자격증</S.Title>
        <img src={info.petSitterLicenseImg} alt="자격증 사진" style={{ width: '180px', height: '150px' }} />
      </S.DivContainer>

      <S.DivContainer>
        <S.Title>이용 가능 서비스</S.Title>
        <S.ServiceList>
          {
            isServiceIdIncluded && isServiceIdIncluded.map((service) => (
              <Item key={service.withPetServiceId} price={service.price} isIncluded={service.isIncluded} serviceImg={service.withPetServiceImg} serviceName={service.withPetServiceName} serviceIntroduction={service.withPetServiceIntroduction} serviceId={service.withPetServiceId} />
            ))
          }
        </S.ServiceList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>필수 서비스</S.Title>
        <S.ServiceList>
          {
            isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (
              <Item key={service.criticalServiceId} price={service.price} isIncluded={service.isIncluded} serviceImg={service.criticalServiceImg} serviceName={service.criticalServiceName} serviceIntroduction={service.criticalServiceIntroduction} serviceId={service.criticalServiceId} />
            ))
          }
        </S.ServiceList>
      </S.DivContainer>
      <S.Button onClick={onModify}>수정</S.Button>
    </S.Container>
  );

  return (
    <>
      { info.petSitterIntroduction ? showInfo : <InitPage /> }
    </>
  );
}

export default PetsitterShowInfo;
