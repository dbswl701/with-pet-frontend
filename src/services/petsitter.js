import axios from 'axios';
import baseUrl from './api';

// 펫시터 자기 정보 불러오기
export const getPetsitterMyInfo = async () => {
  return axios.get(`${baseUrl}/v2/pet-sitters/my-info`, { withCredentials: true });
};

// 펫시터 집 사진 수정
export const putPetsitterHouseImg = async (petSitterHousesRequests) => {
  return axios.put(`${baseUrl}/v2/pet-sitters/houses`, { petSitterHousesRequests }, { withCredentials: true });
};

// 펫시터 정보 초기 등록
export const postPetsitterRegisterInfo = async (updatedInfo) => {
  return axios.post(`${baseUrl}/v2/pet-sitters/my-info`, updatedInfo, { withCredentials: true });
};

// 펫시터 해시태그 수정
export const putPetsitterHashTag = async (petSitterHashTagRequests) => {
  return axios.put(`${baseUrl}/v2/pet-sitters/hashtags`, { petSitterHashTagRequests }, { withCredentials: true });
};

// 펫시터 소개글 수정
export const putPetsitterIntro = async (petSitterIntroduction) => {
  return axios.put(`${baseUrl}/v2/pet-sitters/intro`, { petSitterIntroduction }, { withCredentials: true });
};

// 펫시터 소개글 수정
export const putPetsitterService = async (petSitterServiceRequests) => {
  return axios.put(`${baseUrl}/v2/pet-sitters/services`, { petSitterServiceRequests }, { withCredentials: true });
};
