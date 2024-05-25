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
