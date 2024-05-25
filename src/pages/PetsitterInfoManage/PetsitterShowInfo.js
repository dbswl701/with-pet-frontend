import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, DivContainer, Title, Button,
} from './PetsitterInfoManage.styles';
import { getPetsitterMyInfo } from '../../services/petsitter';
import Item from './Components/Item';

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

  const initPrint = (
    <div style={{
      width: '500px', height: '200px', border: '1px solid gray', margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '150px', borderRadius: '5px',
    }}
    >
      <div style={{ alignItems: 'center', textAlign: 'center' }}>
        <p>등록된 정보가 없습니다.</p>
        <p>등록하기를 눌러 정보를 등록해주세요.</p>
      </div>
      <div>
        <Button style={{ margin: 'auto' }} className="init" onClick={() => navigate('../petsitterInfoManage')}>등록하기</Button>
      </div>
    </div>
  );

  let print = '';
  if (info.petSitterIntroduction === null) {
    print = initPrint;
  } else {
    print = showInfo;
  }

  return (
    <>
      { print }
    </>
  );
}

export default PetsitterShowInfo;
