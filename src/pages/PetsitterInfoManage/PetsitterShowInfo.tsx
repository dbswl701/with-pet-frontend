import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as S from "./PetsitterInfoManage.styles";
import * as S from "./PetsitterInfoManage.styles";
// import { getPetsitterMyInfo } from "../../services/petsitter";
import Item from "./Components/Item";
import InitPage from "./Components/InitPage";
import { getPetsitterMyInfo } from "../../services/petsitter";
import { useGetPetsitterInfoQuery } from "../../hooks/usePetsitterInfoMutation";
// import ServiceItem from './Components/ServiceItem';

interface IWithPetService {
  isIncluded: boolean;
  price: number | null;
  withPetServiceId: number;
  withPetServiceImg: string;
  withPetServiceIntroduction: string;
  withPetServiceName: string;
}

interface ICriticalService {
  isIncluded: boolean;
  price: number | null;
  criticalServiceId: number;
  criticalServiceImg: string;
  criticalServiceIntroduction: string;
  criticalServiceName: string;
}

interface IPetSitterWithPetServices {
  petSitterWithPetServiceId: number;
  petSitterWithPetServicePrice: number;
  withPetServiceId: number;
  withPetServiceImg: string;
  withPetServiceIntroduction: string;
  withPetServiceName: string;
}

interface IWithPetServices {
  withPetServiceId: number;
  withPetServiceImg: string;
  withPetServiceIntroduction: string;
  withPetServiceName: string;
}

interface IPetSitterHouses {
  petSitterHouseId: number;
  petSitterHouseImg: string;
  petSitterHouseRepresentative: boolean;
}

interface IPetSitterHashTags {
  petSitterHashTagId: number;
  petSitterHashTagName: string;
}

interface IPetSitterCriticalServices {
  criticalServiceId: number;
  criticalServiceImg: string;
  criticalServiceIntroduction: string;
  criticalServiceName: string;
  petSitterCriticalServiceId: number;
  petSitterCriticalServicePrice: number;
}

interface ICriticalServices {
  criticalServiceId: number;
  criticalServiceImg: string;
  criticalServiceIntroduction: string;
  criticalServiceName: string;
}

interface IInfo {
  criticalServices: ICriticalServices[];
  petSitterCriticalServices: IPetSitterCriticalServices[];
  petSitterHashTags: IPetSitterHashTags[];
  petSitterHouses: IPetSitterHouses[];
  petSitterIntroduction: string;
  petSitterLicenseImg: string;
  petSitterWithPetServices: IPetSitterWithPetServices[];
  withPetServices: IWithPetServices[];
}

function PetsitterShowInfo() {
  // const [info, setInfo] = useState<IInfo | null>(null);
  const navigate = useNavigate();
  console.log(111);
  // useQuery
  const { data, isLoading, error } = useGetPetsitterInfoQuery();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getPetsitterMyInfo();
  //     setInfo(res.data.result);
  //   };

  //   fetchData();
  // }, []);

  const onModify = () => {
    navigate("../petsitterInfoModify");
  };

  if (error) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  const isServiceIdIncluded: IWithPetService[] =
    data?.withPetServices.map((service) => {
      const selected = data.petSitterWithPetServices.find(
        (sitterService) =>
          sitterService.withPetServiceId === service.withPetServiceId,
      );
      return {
        ...service,
        isIncluded: data.petSitterWithPetServices.some(
          (sitterService) =>
            sitterService.withPetServiceId === service.withPetServiceId,
        ),
        price: selected ? selected.petSitterWithPetServicePrice : null,
      };
    }) || [];

  const isCriticalServiceIdIncluded: ICriticalService[] =
    data?.criticalServices.map((service) => {
      const selected = data.petSitterCriticalServices.find(
        (sitterService) =>
          sitterService.criticalServiceId === service.criticalServiceId,
      );
      return {
        ...service,
        isIncluded: data.petSitterCriticalServices.some(
          (sitterService) =>
            sitterService.criticalServiceId === service.criticalServiceId,
        ),
        price: selected ? selected.petSitterCriticalServicePrice : null,
      };
    }) || [];

  console.log("info: ", data);
  console.log("isServiceIdIncluded:", isServiceIdIncluded);
  console.log("isCriticalServiceIdIncluded:", isCriticalServiceIdIncluded);

  const showInfo = (
    <S.Container>
      <S.MainTitle className="page">펫시터 정보 관리 페이지</S.MainTitle>
      <S.DivContainer>
        <S.Title>집사진</S.Title>
        <S.HouseImgList>
          {data?.petSitterHouses.map((img) => (
            <S.HouseImgContainer key={img.petSitterHouseId}>
              <S.HouseImg
                key={img.petSitterHouseId}
                src={img.petSitterHouseImg}
                alt="집사진"
                isRepresentative={img.petSitterHouseRepresentative}
                isModify={false}
              />
            </S.HouseImgContainer>
          ))}
        </S.HouseImgList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>해시태그</S.Title>
        <S.HashTagList>
          {data?.petSitterHashTags.map((tag) => (
            <S.HashTagItem className="list" key={tag.petSitterHashTagId}>
              <S.HashTag># {tag.petSitterHashTagName}</S.HashTag>
            </S.HashTagItem>
          ))}
        </S.HashTagList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>소개글</S.Title>
        <p>{data?.petSitterIntroduction}</p>
      </S.DivContainer>

      <S.DivContainer>
        <S.Title>자격증</S.Title>
        <img
          src={data?.petSitterLicenseImg}
          alt="자격증 사진"
          style={{ width: "180px", height: "150px" }}
        />
      </S.DivContainer>

      <S.DivContainer>
        <S.Title>이용 가능 서비스</S.Title>
        <S.ServiceList>
          {isServiceIdIncluded &&
            isServiceIdIncluded.map((service) => (
              <Item
                key={service.withPetServiceId}
                price={service.price}
                isIncluded={service.isIncluded}
                serviceImg={service.withPetServiceImg}
                serviceName={service.withPetServiceName}
                serviceIntroduction={service.withPetServiceIntroduction}
              />
            ))}
        </S.ServiceList>
      </S.DivContainer>
      <S.DivContainer>
        <S.Title>필수 서비스</S.Title>
        <S.ServiceList>
          {isCriticalServiceIdIncluded &&
            isCriticalServiceIdIncluded.map((service) => (
              <Item
                key={service.criticalServiceId}
                price={service.price}
                isIncluded={service.isIncluded}
                serviceImg={service.criticalServiceImg}
                serviceName={service.criticalServiceName}
                serviceIntroduction={service.criticalServiceIntroduction}
              />
            ))}
        </S.ServiceList>
      </S.DivContainer>
      <S.Button onClick={onModify}>수정</S.Button>
    </S.Container>
  );

  return <>{data?.petSitterIntroduction ? showInfo : <InitPage />}</>;
}

export default PetsitterShowInfo;
