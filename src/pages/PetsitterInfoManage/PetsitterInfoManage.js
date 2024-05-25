import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import {
  Container, Label, DivContainer, InputButton, CancelButton, Title,
} from './InfoStyle';
import Item1 from './Components/Item1';
import Item2 from './Components/Item2';
import { getPetsitterMyInfo } from '../../services/petsitter';

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
    const fetchData = async () => {
      const res = await getPetsitterMyInfo();
      setInfo(res.data.result);
      setCriticalServices(res.data.result.petSitterCriticalServices);
      setServiceSelectList(res.data.result.petSitterWithPetServices);

      console.log('info:', res.data.result);
      setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);
    };
    fetchData();
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
          const temp = { petSitterHouseId: 0, petSitterHouseRepresentative: index === 0, petSitterHouseImg: img };
          setHouseImgList((prevImages) => [...prevImages, temp]);
        });
      });
  };
  const onRemoveHousImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg !== id));

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
      const isIncluded = serviceSelectList.some((sitterService) => sitterService.withPetServiceId === service.withPetServiceId);
      const selected = serviceSelectList.find((sitterService) => sitterService.withPetServiceId === service.withPetServiceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsServiceIdIncluded(includedServices);
  }, [serviceSelectList]);

  // 필수 서비스
  useEffect(() => {
    const includedServices = info.criticalServices && info.criticalServices.map((service) => {
      const isIncluded = criticalServices.some((sitterService) => sitterService.criticalServiceId === service.criticalServiceId);
      const selected = criticalServices.find((sitterService) => sitterService.criticalServiceId === service.criticalServiceId);
      const price = selected ? selected.price : null;
      return { ...service, isIncluded, price };
    });
    setIsCriticalServiceIdIncluded(includedServices);
  }, [criticalServices]);

  const onRemoveService = (id) => {
    setServiceSelectList(serviceSelectList.filter((service) => service.withPetServiceId !== id));
  };

  const onAddService = (id, price, serviceName) => {
    setServiceSelectList([...serviceSelectList, { withPetServiceId: id, price: parseInt(price, 10), serviceName }]);
  };

  const onRemoveCriticalService = (id) => {
    setCriticalServices(criticalServices.filter((service) => service.criticalServiceId !== id));
  };

  const onAddCriticalService = (id, price, serviceName) => {
    setCriticalServices([...criticalServices, { criticalServiceId: id, price: parseInt(price, 10), serviceName }]);
  };

  console.log('houseImgList:', houseImgList);

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
                <img key={img.petSitterHouseImg} src={img.petSitterHouseImg} alt="집사진" style={{ width: '200px', height: '200px' }} />
                &ensp;
                <CancelButton type="button" className="cancel" value="X" onClick={() => onRemoveHousImg(img.petSitterHouseImg)} />
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
              <Item1 key={service.withPetServiceId} service={service} onRemove={onRemoveService} />
            ) : (
              <Item2 key={service.withPetServiceId} service={service} onAdd={onAddService} />
            )))}
          </div>
        </DivContainer>
        <DivContainer>
          <Title>필수 서비스</Title>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {isCriticalServiceIdIncluded && isCriticalServiceIdIncluded.map((service) => (service.isIncluded ? (
              <Item1 key={service.criticalServiceId} service={service} onRemove={onRemoveCriticalService} />
            ) : (
              <Item2 key={service.criticalServiceId} service={service} onAdd={onAddCriticalService} />
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
