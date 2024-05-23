// 관리자 api
import axios from 'axios';
import baseUrl from './api';

// 관리자 서비스 get
export const getAdminServices = async () => {
  return axios.get(`${baseUrl}/v2/services`, { withCredentials: true });
};

// 관리자 필수 서비스 get
export const getAdminCriticalServices = async () => {
  return axios.get(`${baseUrl}/v2/critical-services`, { withCredentials: true });
};

// 관리자 서비스 추가
export const postAdminService = async (body) => {
  return axios.post(`${baseUrl}/v2/admins/service`, body, { withCredentials: true });
};

// 관리자 필수 서비스 추가
export const postAdminCriticalService = async (body) => {
  return axios.post(`${baseUrl}/v2/admins/critical-service`, body, { withCredentials: true });
};

// 관리자 서비스 삭제
export const deleteAdminService = async (serviceId) => {
  return axios.delete(`${baseUrl}/v2/admins/service/${serviceId}`, { withCredentials: true });
};

// 관리자 서비스 수정
export const putAdminService = async (modifyPetInfo) => {
  const body = {
    serviceName: modifyPetInfo.serviceName,
    serviceImg: modifyPetInfo.serviceImg,
    serviceIntroduction: modifyPetInfo.serviceIntroduction,
  };
  return axios.put(`${baseUrl}/v2/admins/service/${modifyPetInfo.serviceId}`, body, { withCredentials: true });
};

// 관리자 필수 서비스 수정
export const putAdminCriticalService = async (modifyPetInfo) => {
  const body = {
    serviceName: modifyPetInfo.serviceName,
    serviceImg: modifyPetInfo.serviceImg,
    serviceIntroduction: modifyPetInfo.serviceIntroduction,
  };
  return axios.put(`${baseUrl}/v2/admins/critical-service/${modifyPetInfo.serviceId}`, body, { withCredentials: true });
};
