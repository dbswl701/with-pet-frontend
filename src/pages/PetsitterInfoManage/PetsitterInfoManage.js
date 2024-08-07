import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { petsitterInfoResigerSchema } from '../../schemas/petsitterInfoRegister.schemas';
import * as S from './PetsitterInfoManage.styles';
import { getPetsitterMyInfo, postPetsitterRegisterInfo } from '../../services/petsitter';
import HouseUpdate from './Components/HouseUpdate';
import HashTagUpdate from './Components/HashTagUpdate';
import IntroUpdate from './Components/IntroUpdate';
import WithPetServiceUpdate from './Components/WithPetServiceUpdate';
import CriticalServiceUpdate from './Components/CriticalServiceUpdate';

function PetsitterInfoManage() {
  const navigate = useNavigate();
  const {
    register, handleSubmit, setValue, watch, trigger, formState: { errors },
  } = useForm({
    resolver: zodResolver(petsitterInfoResigerSchema),
    defaultValues: {
      petSitterHashTags: [], // 초기 값을 빈 배열로 설정
      petSitterWithPetServices: [],
      petSitterCriticalServices: [],
    },
  });

  const [info, setInfo] = useState({});

  // const [introduction, setIntroduction] = useState('');
  // const [houseImgList, setHouseImgList] = useState([]);
  const [serviceSelectList, setServiceSelectList] = useState([]);
  const [criticalServices, setCriticalServices] = useState([]);
  const [petSitterLicenseImg, setPetSitterLicenseImg] = useState('');

  console.log('[watch] hashtag: ', watch('hashTags'), 'intro:', watch('introduction'));
  console.log('에러 확인:', errors);
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

  const onSubmit = async (data) => {
    console.log('data:', data);

    await postPetsitterRegisterInfo(data);
    navigate('../petsitterShowInfo');

    // eslint-disable-next-line no-alert
    alert('펫시터 정보 등록이 완료되었습니다.');
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

  // console.log('isServiceIdIncluded:', isServiceIdIncluded);
  // console.log('isCriticalServiceIdIncluded:', isCriticalServiceIdIncluded);

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
    const newServiceList = serviceSelectList.filter((service) => service.withPetServiceId !== id);
    setServiceSelectList(newServiceList);
    setValue('petSitterWithPetServices', newServiceList, { shouldValidate: true });
  };

  const onAddService = (id, price) => {
    const newServiceList = [...serviceSelectList, { withPetServiceId: id, petSitterWithPetServicePrice: parseInt(price, 10) }];
    setServiceSelectList(newServiceList);
    setValue('petSitterWithPetServices', newServiceList, { shouldValidate: true });
  };

  const onRemoveCriticalService = (id) => {
    const newServiceList = criticalServices.filter((service) => service.criticalServiceId !== id);
    setCriticalServices(newServiceList);
    setValue('petSitterCriticalServices', newServiceList, { shouldValidate: true });
  };

  const onAddCriticalService = (id, price) => {
    const newServiceList = [...criticalServices, { criticalServiceId: id, petSitterCriticalServicePrice: parseInt(price, 10) }];
    setCriticalServices(newServiceList);
    setValue('petSitterCriticalServices', newServiceList, { shouldValidate: true });
  };

  console.log('에러 유무 확인:', Object.keys(errors).length, !!Object.keys(errors).length);
  return (
    <>
      <S.Container>
        <S.MainTitle className="page">펫시터 정보 등록 페이지</S.MainTitle>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          {/* <S.DivContainer>
          </S.DivContainer> */}
          <HouseUpdate register={register} errors={errors} setValue={setValue} />
          <HashTagUpdate register={register} setValue={setValue} errors={errors} />
          <IntroUpdate register={register} errors={errors} trigger={trigger} />
          <S.DivContainer>
            <S.Title>자격증</S.Title>
            <S.LicenseImg alt="이미지 미리보기" src={petSitterLicenseImg} />
          </S.DivContainer>
          <WithPetServiceUpdate setValue={setValue} errors={errors} isServiceIdIncluded={isServiceIdIncluded} onRemoveService={onRemoveService} onAddService={onAddService} />
          <CriticalServiceUpdate setValue={setValue} errors={errors} isCriticalServiceIdIncluded={isCriticalServiceIdIncluded} onRemoveCriticalService={onRemoveCriticalService} onAddCriticalService={onAddCriticalService} />

          <S.BtnContainer style={{
            width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
          }}
          >
            <S.InputButton type="submit" value="수정" isError={Object.keys(errors).length} />
            <S.InputButton type="button" value="취소" onClick={() => navigate('../petsitterShowInfo')} />
          </S.BtnContainer>
        </S.Form>
      </S.Container>
    </>
  );
}

export default PetsitterInfoManage;
