import axios from "axios";
import baseUrl from "./api";
import {
  IUpdatedInfo,
  IPetSitterWithPetServices,
  IPetSitterCriticalServices,
  IPetSitterHashTags,
  IPetSitterHouses,
  IPetSitterInfoRes,
} from "../pages/PetsitterInfoModify/types/petsitter.types";
import {
  IPetsitterDetail,
  IPetsitterList,
  IReservationDogs,
} from "../pages/PetList/types/petsitter";
import { IOptions } from "../pages/PetList/types/main";

// 펫시터 자기 정보 불러오기
export const getPetsitterMyInfo = async () => {
  const res = await axios.get(`${baseUrl}/v2/pet-sitters/my-info`, {
    withCredentials: true,
  });
  // return axios.get(`${baseUrl}/v2/pet-sitters/my-info`, {
  //   withCredentials: true,
  // });
  return res.data.result as unknown as IPetSitterInfoRes;
};

// 펫시터 집 사진 수정
export const putPetsitterHouseImg = async (
  petSitterHousesRequests: IPetSitterHouses[]
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/houses`,
    { petSitterHousesRequests },
    { withCredentials: true }
  );
};

// 펫시터 정보 초기 등록
export const postPetsitterRegisterInfo = async (updatedInfo: IUpdatedInfo) => {
  return axios.post(`${baseUrl}/v2/pet-sitters/my-info`, updatedInfo, {
    withCredentials: true,
  });
};

// 펫시터 해시태그 수정
export const putPetsitterHashTag = async (
  petSitterHashTagRequests: IPetSitterHashTags[]
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/hashtags`,
    { petSitterHashTagRequests },
    { withCredentials: true }
  );
};

// 펫시터 소개글 수정
export const putPetsitterIntro = async (petSitterIntroduction: string) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/intro`,
    { petSitterIntroduction },
    { withCredentials: true }
  );
};

// 펫시터 이용 가능 서비스 수정
export const putPetsitterService = async (
  petSitterServiceRequests: IPetSitterWithPetServices[]
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/services`,
    { petSitterServiceRequests },
    { withCredentials: true }
  );
};

// 펫시터 필수 서비스 수정
export const putPetsitterCriticalService = async (
  petSitterCriticalServiceRequests: IPetSitterCriticalServices[]
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/critical-service`,
    { petSitterCriticalServiceRequests },
    { withCredentials: true }
  );
};

// 메인페이지 펫시터 목록 불러오기
export const getPetsitters = async (options: IOptions, currentPage: number) => {
  const res = await axios.get(
    `${baseUrl}/v2/pet-sitters?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ""}&page=${currentPage}`,
    {
      withCredentials: true,
    }
  );

  return res.data.result as unknown as IPetsitterList;
};

// 펫시터 디테일 정보 불러오기
export const getPetsitterDetail = async (petSitterId: string | undefined) => {
  const res = await axios.get(`${baseUrl}/v2/pet-sitters/${petSitterId}`, {
    withCredentials: true,
  });

  return res.data.result as unknown as IPetsitterDetail;
};

// 예약 페이지 반려견 리스트 조회
export const getReservationDogs = async (petsitterId: string | undefined) => {
  const res = await axios.get(
    `${baseUrl}/v2/dogs/reservation-dogs?petSitterId=${petsitterId}`,
    { withCredentials: true }
  );

  return res.data.result as unknown as IReservationDogs[];
};
