import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './PetsitterInfoManage.styles';
import { getPetsitterMyInfo, postPetsitterRegisterInfo } from '../../services/petsitter';
import PostFileUpload from '../../services/upload';
import HouseUpdate from './Components/HouseUpdate';
import HashTagUpdate from './Components/HashTagUpdate';
import IntroUpdate from './Components/IntroUpdate';
import WithPetServiceUpdate from './Components/WithPetServiceUpdate';
import CriticalServiceUpdate from './Components/CriticalServiceUpdate';

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
      setPetSitterLicenseImg(res.data.result.petSitterLicenseImg);
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updatedInfo = {
      introduction,
      petSitterCriticalServiceRequests: criticalServices,
      petSitterHashTagRequests: hashTags,
      petSitterHouseRequests: houseImgList,
      petSitterServiceRequests: serviceSelectList,
    };

    await postPetsitterRegisterInfo(updatedInfo);
    navigate('../petsitterShowInfo');

    // axios.post('https://withpet.site/api/v1/petsitter/register-myinfo', updatedInfo, { withCredentials: true })
    //   .then(() => {
    //     navigate('../petsitterShowInfo');
    //   })
    //   .catch(() => {
    //     // eslint-disable-next-line no-alert
    //     alert('오류');
    //   });
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
    const res = await PostFileUpload(formData);
    res.data.result.forEach((img, index) => {
      const temp = { petSitterHouseId: 0, petSitterHouseRepresentative: index === 0, petSitterHouseImg: img };
      setHouseImgList((prevImages) => [...prevImages, temp]);
    });
  };
  const onRemoveHouseImg = (id) => {
    const removeHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg === id));
    const updateHouseImg = houseImgList.filter((img) => (img.petSitterHouseImg !== id));
    setHouseImgList(updateHouseImg);
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

  return (
    <>
      <S.Container>
        <S.Title className="page">펫시터 정보 수정 페이지</S.Title>
        <S.Form onSubmit={onSubmit}>
          {/* <S.DivContainer>
          </S.DivContainer> */}
          <HouseUpdate houseImgList={houseImgList} onRemoveHouseImg={onRemoveHouseImg} handleImageUpload={handleImageUpload} />
          <HashTagUpdate hashTags={hashTags} handleHashtag={handleHashtag} onRemoveHashtag={onRemoveHashtag} setHashTag={setHashTag} hashTag={hashTag} />
          <IntroUpdate introduction={introduction} setIntroduction={setIntroduction} />
          <S.DivContainer>
            <S.Title>자격증</S.Title>
            <S.LicenseImg alt="이미지 미리보기" src={petSitterLicenseImg} />
          </S.DivContainer>
          <WithPetServiceUpdate isServiceIdIncluded={isServiceIdIncluded} onRemoveService={onRemoveService} onAddService={onAddService} />
          <CriticalServiceUpdate isCriticalServiceIdIncluded={isCriticalServiceIdIncluded} onRemoveCriticalService={onRemoveCriticalService} onAddCriticalService={onAddCriticalService} />

          <S.DivContainer style={{
            width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
          }}
          >
            <S.InputButton type="submit" value="수정" />
            <S.InputButton type="button" value="취소" onClick={() => navigate('../petsitterShowInfo')} />
          </S.DivContainer>
        </S.Form>
      </S.Container>
    </>
  );
}

export default PetsitterInfoManage;
