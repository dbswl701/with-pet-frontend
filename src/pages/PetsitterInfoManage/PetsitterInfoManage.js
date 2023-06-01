import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
// import styled from 'styled-components';
import {
  Container, Label, DivContainer, Button, CancelButton, Title,
} from './InfoStyle';

function Item1({ service, onRemove }) {
  // 1. 활성화 (isInclude === true)
  const includeed = (
    <div style={{
      // cursor: 'pointer', backgroundColor: '#caa969', width: '300px', marginRight: '20px',
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : '#F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
    }}
    >
      {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px', marginTop: '5px' }} />
      </div>
      <div style={{ paddingLeft: '5px' }}>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
        <p>가격: {service.price}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button value="삭제" onClick={() => onRemove(service.serviceId)}>삭제</Button>
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
        cursor: 'pointer', backgroundColor: '#F2F2F2', width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
      }}
    >
      {/* 사진, 이름, 내용, 가격, 삭제 버튼 */}
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px' }} />
      </div>
      <div>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <input style={{ width: '80%', marginBottom: '3px' }} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Button value="추가" onClick={() => onAdd(service.serviceId, price)}>추가</Button>
      </div>
    </div>
  );

  return (
    <>
      { notIncluded }
    </>
  );
}

function PetsitterInfoManage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});

  // 해시태그(petSitterHashTags)
  const [hashTags, setHashTags] = useState([]);
  const [hashTag, setHashTag] = useState('');

  // 소개글(introduction)
  const [introduction, setIntroduction] = useState('');

  // // 필수 서비스(petSitterCriticalServiceRequests)
  // const [criticalService, setCriticalService] = useState([]);

  // // 펫시터 집사진(petSitterHouseRequests)
  const [houseImgList, setHouseImgList] = useState([]);

  // // 펫시텃 서비스
  const [serviceSelectList, setServiceSelectList] = useState([]);

  // 필수 서비스
  const [criticalServices, setCriticalServices] = useState([]);

  // 자격증 사진
  const [petSitterLicenseImg, setPetSitterLicenseImg] = useState('');

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        setInfo(res.data.result);
        // // console.log(res.data.result);
        // // console.log(res.data.result.introduction === null);
        // setInfo(res.data.result);

        // setIntroduction(res.data.result.introduction);
        // setHashTags(res.data.result.petSitterHashTags);
        // setHouseImgList(res.data.result.petSitterHouses);
        setCriticalServices(res.data.result.petSitterCriticalServices);
        setServiceSelectList(res.data.result.petSitterServices);
        setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);
      })
      .catch(() => {
      });
  }, []);
  // console.log(info);
  // console.log(info.withPetServices);

  const onSubmit = (e) => {
    e.preventDefault();

    const houseList = houseImgList.map((houseImg, index) => {
      const representative = index === 0;
      return { houseImg, representative };
    });
    const updatedInfo = {
      introduction,
      petSitterCriticalServiceRequests: criticalServices,
      petSitterHashTagRequests: hashTags,
      petSitterHouseRequests: houseList,
      petSitterServiceRequests: serviceSelectList,
    };
    // console.log(updatedInfo);
    axios.post('https://withpet.site/api/v1/petsitter/register-myinfo', updatedInfo, { withCredentials: true })
      .then(() => {
        // console.log(res.data.result);
        navigate('../petsitterShowInfo');
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('오류');
      });
  };

  const handleHashtag = () => {
    if (hashTags.includes(hashTag)) {
      // console.log('중복된 값입니다.');
    } else {
      setHashTags([...hashTags, { petSitterHashTagId: 0, hashTagName: hashTag }]);
    }
    setHashTag('');
  };
  // console.log(hashTags);
  // console.log(introduction);
  const onRemoveHashtag = (id) => {
    // 해시태그 하나 삭제
    setHashTags(hashTags.filter((tag) => (tag !== id)));
  };

  const onRemoveHousImg = (id) => {
    // 집 이미지 하나 삭제
    // console.log(id);
    setHouseImgList(houseImgList.filter((img) => (img !== id)));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const imagePreview = ev.target.result;
        setHouseImgList((prevImages) => [...prevImages, imagePreview]);
      };
      reader.readAsDataURL(file);
    });
  };
  // console.log(houseImgList);

  const [isServiceIdIncluded, setIsServiceIdIncluded] = useState([]);
  const [isCriticalServiceIdIncluded, setIsCriticalServiceIdIncluded] = useState([]);

  // 이용 가능 서비스
  useEffect(() => {
    const includedServices = info.withPetServices && info.withPetServices.map((service) => {
      const isIncluded = serviceSelectList.some((sitterService) => sitterService.serviceId === service.serviceId);
      const selected = serviceSelectList.find((sitterService) => sitterService.serviceId === service.serviceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsServiceIdIncluded(includedServices);
  }, [serviceSelectList]);

  // 필수 서비스
  useEffect(() => {
    const includedServices = info.criticalServices && info.criticalServices.map((service) => {
      const isIncluded = criticalServices.some((sitterService) => sitterService.serviceId === service.serviceId);
      const selected = criticalServices.find((sitterService) => sitterService.serviceId === service.serviceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsCriticalServiceIdIncluded(includedServices);
  }, [criticalServices]);

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

  const onRemoveCriticalService = (id) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    // console.log(id);
    setCriticalServices(criticalServices.filter((service) => service.serviceId !== id));
  };

  const onAddCriticalService = (id, price) => { // sercieId 건너옴
    // 활성화된 서비스 삭제 눌렀을 경우
    // console.log(id);
    setCriticalServices([...criticalServices, { serviceId: id, price: parseInt(price, 10) }]);
  };

  const modify = (
    <Container>
      {/* <Content> */}
      <Title className="page">펫시터 정보 수정 페이지</Title>
      <form onSubmit={onSubmit}>
        <DivContainer>
          <div style={{ flexDirection: 'row' }}>
            <Title>집사진</Title>
            {/* <div> */}
            {
            houseImgList && houseImgList.map((img, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <img key={img} src={img} alt="집사진" style={{ width: '200px', height: '200px' }} />
                {/* <input type="button" value="x" /> */}
                &ensp;
                <CancelButton className="cancel" value="X" onClick={() => onRemoveHousImg(img)}>X</CancelButton>
                { index === 0 ? <p>대표사진</p> : <p> </p>}
              </div>
            ))
          }
          </div>
          {/* </div> */}
          <>
            <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageChange} />
            {/* <Button multiple onChange={handleImageChange}>집 사진 업로드</Button> */}
            <Label htmlFor="file">이미지 추가</Label>
          </>
        </DivContainer>
        <DivContainer>
          <Title>해시태그</Title>
          <div style={{ display: 'flex', flexDirection: 'start' }}>
            {hashTags && hashTags.map((tag) => (
              <div className="list" key={tag.hashTagName} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                #{tag.hashTagName}&ensp;
                {/* <span># {tag.hashTagName}</span> */}
                {/* <input type="button" value="x" onClick={() => onRemoveHashtag(tag.petSitterHashTagId)} /> */}
                <CancelButton className="cancel" value="X" onClick={() => onRemoveHashtag(tag)}>X</CancelButton>&ensp;
              </div>
            ))}
          </div>
          <TextField sx={{ m: 1 }} variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
          {/* <TextField sx={{ m: 1 }} label="해시태그" variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} /> */}
          {/* <input type="button" onClick={handleHashtag} value="추가" /> */}
          <Button onClick={handleHashtag} value="추가">추가</Button>
        </DivContainer>
        <DivContainer>
          <Title>소개글</Title>
          <TextField multiline rows={3} sx={{ m: 1 }} variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
        </DivContainer>
        <DivContainer>
          <Title>자격증</Title>
          <img alt="이미지 미리보기" src={petSitterLicenseImg} style={{ width: '180px', height: '150px' }} />
        </DivContainer>
        <DivContainer>
          <Title>이용 가능 서비스</Title>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {isServiceIdIncluded && isServiceIdIncluded.map((service) => (service.isIncluded ? (
              <Item1 key={service.serviceId} service={service} onRemove={onRemoveService} />
            ) : (
              <Item2 key={service.serviceId} service={service} onAdd={onAddService} />
            )))}
          </div>
        </DivContainer>
        <DivContainer>
          <Title>필수 서비스</Title>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (service.isIncluded ? (
              <Item1 key={service.serviceId} service={service} onRemove={onRemoveCriticalService} />
            ) : (
              <Item2 key={service.serviceId} service={service} onAdd={onAddCriticalService} />
            )))}
          </div>
        </DivContainer>
        <DivContainer style={{
          width: '100%', display: 'inline-block', justifyContent: 'center', alignContent: 'center', alignItems: 'center',
        }}
        >
          <Button value="수정">수정</Button>
          <Button value="취소" onClick={() => navigate('../petsitterShowInfo')}>취소</Button>
        </DivContainer>
      </form>
      {/* </Content> */}
    </Container>
  );
  return (
    <>
      { modify }
    </>
  );
}

export default PetsitterInfoManage;
