import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
  Container, Label, DivContainer, InputButton, CancelButton, Title,
} from './InfoStyle';

function Item1({ service, onRemove }) {
  const includeed = (
    <div style={{
      backgroundColor: `${service.isIncluded === true ? '#FAF6F0' : '#F2F2F2'}`, color: `${service.isIncluded === true ? '#CAA969' : 'gray'}`, width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
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
        cursor: 'pointer', backgroundColor: '#F2F2F2', width: '130px', height: '200px', marginRight: '5px', borderRadius: '20px', padding: '10px', fontSize: '10px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img src={service.serviceImg} alt="서비스 이미지" style={{ width: '30px', height: '30px' }} />
      </div>
      <div>
        <p>{service.serviceName}</p>
        <p>{service.serviceIntroduction}</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <input style={{ width: '80%', marginBottom: '3px' }} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <InputButton type="button" value="추가" onClick={() => onAdd(service.serviceId, price, service.serviceName)} />
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

  const [hashTags, setHashTags] = useState([]);
  const [hashTag, setHashTag] = useState('');

  const [introduction, setIntroduction] = useState('');

  const [houseImgList, setHouseImgList] = useState([]);

  const [serviceSelectList, setServiceSelectList] = useState([]);

  const [criticalServices, setCriticalServices] = useState([]);

  const [petSitterLicenseImg, setPetSitterLicenseImg] = useState('');

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/petsitter/show-myinfo', { withCredentials: true })
      .then((res) => {
        setInfo(res.data.result);
        setCriticalServices(res.data.result.petSitterCriticalServices);
        setServiceSelectList(res.data.result.petSitterServices);
        setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);
      })
      .catch(() => {
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const updatedInfo = {
      introduction,
      petSitterCriticalServiceRequests: criticalServices,
      petSitterHashTagRequests: hashTags,
      petSitterHouseRequests: houseImgList,
      petSitterServiceRequests: serviceSelectList,
    };
    axios.post('https://withpet.site/api/v1/petsitter/register-myinfo', updatedInfo, { withCredentials: true })
      .then(() => {
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
      setHashTags([...hashTags, { petSitterhashTagId: 0, hashTagName: hashTag }]);
    }
    setHashTag('');
  };
  const onRemoveHashtag = (id) => {
    setHashTags(hashTags.filter((tag) => (tag !== id)));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('file', file);
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        res.data.result.forEach((img, index) => {
          const temp = { houseId: 0, representative: index === 0, houseImg: img };
          setHouseImgList((prevImages) => [...prevImages, temp]);
        });
      });
  };
  const onRemoveHousImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.houseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.houseImg !== id));

    if (removeHouseImg[0].representative === true) {
      setHouseImgList(updateHouseImg.map((img, index) => {
        if (index === 0) {
          return { ...img, representative: true };
        }
        return img;
      }));
    }
  };

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

  const onRemoveService = (id) => {
    setServiceSelectList(serviceSelectList.filter((service) => service.serviceId !== id));
  };

  const onAddService = (id, price, serviceName) => {
    setServiceSelectList([...serviceSelectList, { serviceId: id, price: parseInt(price, 10), serviceName }]);
  };

  const onRemoveCriticalService = (id) => {
    setCriticalServices(criticalServices.filter((service) => service.serviceId !== id));
  };

  const onAddCriticalService = (id, price, serviceName) => {
    setCriticalServices([...criticalServices, { serviceId: id, price: parseInt(price, 10), serviceName }]);
  };

  const modify = (
    <Container>
      <Title className="page">펫시터 정보 수정 페이지</Title>
      <form onSubmit={onSubmit}>
        <DivContainer>
          <div style={{ flexDirection: 'row' }}>
            <Title>집사진</Title>
            {
            houseImgList && houseImgList.map((img, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <img key={img.houseImg} src={img.houseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />
                &ensp;
                <CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHousImg(img.houseImg)} />
                { index === 0 ? <p>대표사진</p> : <p> </p>}
              </div>
            ))
          }
          </div>
          <>
            <input id="file" multiple style={{ visibility: 'hidden' }} type="file" accept="image/*" onChange={handleImageUpload} />
            <Label htmlFor="file">이미지 추가</Label>
          </>
        </DivContainer>
        <DivContainer>
          <Title>해시태그</Title>
          <div style={{ display: 'flex', flexDirection: 'start' }}>
            {hashTags && hashTags.map((tag) => (
              <div className="list" key={tag.hashTagName} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                #{tag.hashTagName}&ensp;
                <CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHashtag(tag)} />&ensp;
              </div>
            ))}
          </div>
          <TextField sx={{ m: 1 }} variant="outlined" size="small" name="hashTagName" onChange={(e) => setHashTag(e.target.value)} value={hashTag} />
          <InputButton type="button" onClick={handleHashtag} value="추가" />
        </DivContainer>
        <DivContainer>
          <Title>소개글</Title>
          <TextField multiline rows={3} sx={{ m: 1 }} variant="outlined" size="small" name="introduction" onChange={(e) => setIntroduction(e.target.value)} value={introduction} required />
        </DivContainer>
        <DivContainer>
          <Title>자격증</Title>
          <img alt="이미지 미리보기" src={petSitterLicenseImg} style={{ width: '180px' }} />
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
          width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
        }}
        >
          <InputButton type="submit" value="수정" />
          <InputButton type="button" value="취소" onClick={() => navigate('../petsitterShowInfo')} />
        </DivContainer>
      </form>
    </Container>
  );
  return (
    <>
      { modify }
    </>
  );
}

export default PetsitterInfoManage;
