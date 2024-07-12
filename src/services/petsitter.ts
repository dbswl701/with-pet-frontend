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
  petSitterHousesRequests: IPetSitterHouses[],
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/houses`,
    { petSitterHousesRequests },
    { withCredentials: true },
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
  petSitterHashTagRequests: IPetSitterHashTags[],
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/hashtags`,
    { petSitterHashTagRequests },
    { withCredentials: true },
  );
};

// 펫시터 소개글 수정
export const putPetsitterIntro = async (petSitterIntroduction: string) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/intro`,
    { petSitterIntroduction },
    { withCredentials: true },
  );
};

// 펫시터 이용 가능 서비스 수정
export const putPetsitterService = async (
  petSitterServiceRequests: IPetSitterWithPetServices[],
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/services`,
    { petSitterServiceRequests },
    { withCredentials: true },
  );
};

// 펫시터 필수 서비스 수정
export const putPetsitterCriticalService = async (
  petSitterCriticalServiceRequests: IPetSitterCriticalServices,
) => {
  return axios.put(
    `${baseUrl}/v2/pet-sitters/critical-service`,
    { petSitterCriticalServiceRequests },
    { withCredentials: true },
  );
};
