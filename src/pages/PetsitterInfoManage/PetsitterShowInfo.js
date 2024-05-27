import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, DivContainer, Title, Button,
} from './PetsitterInfoManage.styles';
import { getPetsitterMyInfo } from '../../services/petsitter';
import Item from './Components/Item';
import InitPage from './Components/InitPage';

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
    const selected = info.petSitterWithPetServices.find((sitterService) => sitterService.serviceId === service.serviceId);
    return {
      ...service,
      isIncluded: info.petSitterWithPetServices.some(
        (sitterService) => sitterService.serviceId === service.serviceId,
      ),
      price: selected ? selected.price : null,
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

  const showInfo = (
    <Container>
      <Title className="page">펫시터 정보 관리 페이지</Title>
      <DivContainer>
        <div style={{ flexDirection: 'row' }}>
          <Title>집사진</Title>
          {
            info.petSitterHouses && info.petSitterHouses.map((img) => {
              return <img key={img.petSitterHouseId} src={img.houseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />;
            })
          }
        </div>
      </DivContainer>
      <DivContainer>
        <Title>해시태그</Title>
        <div style={{ display: 'flex' }}>
          {
          info.petSitterHashTags && info.petSitterHashTags.map((tag) => {
            return <p style={{ textAlign: 'left' }} key={tag.petSitterHashTagId}>#{tag.hashTagName}&ensp;</p>;
          })
        }
        </div>
      </DivContainer>
      <DivContainer>
        <Title>소개글</Title>
        <p>{info.introduction}</p>
      </DivContainer>

      <DivContainer>
        <Title>자격증</Title>
        <img src={info.petSitterLicenseImg} alt="자격증 사진" style={{ width: '180px', height: '150px' }} />
      </DivContainer>

      <DivContainer>
        <Title>이용 가능 서비스</Title>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isServiceIdIncluded && isServiceIdIncluded.map((service) => {
              return <Item key={service.withPetServiceId} service={service} />;
            })
          }
        </div>
      </DivContainer>
      <DivContainer>
        <Title>필수 서비스</Title>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => {
              return <Item key={service.criticalServiceId} service={service} />;
            })
          }
        </div>
      </DivContainer>
      <Button onClick={onModify}>수정</Button>
    </Container>
  );

  return (
    <>
      { info.petSitterIntroduction ? showInfo : <InitPage /> }
    </>
  );
}

export default PetsitterShowInfo;
