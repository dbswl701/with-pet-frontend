// any 나중에 수정!

// 관리자 api
import axios from "axios";
import baseUrl from "./api";
import { IAdminServiceRes } from "../types/admin.types";

// 관리자 서비스 get
export const getAdminServices = async () => {
  const res = await axios.get(`${baseUrl}/v2/services`, {
    withCredentials: true,
  });
  // return axios.get(`${baseUrl}/v2/services`, { withCredentials: true });
  return res.data.result as unknown as IAdminServiceRes[];
};

// 관리자 필수 서비스 get
export const getAdminCriticalServices = async () => {
  return axios.get(`${baseUrl}/v2/critical-services`, {
    withCredentials: true,
  });
};

// 관리자 서비스 추가
export const postAdminService = async (body: any) => {
  return axios.post(`${baseUrl}/v2/admins/service`, body, {
    withCredentials: true,
  });
};

// 관리자 필수 서비스 추가
export const postAdminCriticalService = async (body: any) => {
  return axios.post(`${baseUrl}/v2/admins/critical-service`, body, {
    withCredentials: true,
  });
};

// 관리자 서비스 삭제
export const deleteAdminService = async (serviceId: any) => {
  return axios.delete(`${baseUrl}/v2/admins/service/${serviceId}`, {
    withCredentials: true,
  });
};

// 관리자 서비스 수정
export const putAdminService = async (modifyPetInfo: any) => {
  const body = {
    serviceName: modifyPetInfo.serviceName,
    serviceImg: modifyPetInfo.serviceImg,
    serviceIntroduction: modifyPetInfo.serviceIntroduction,
  };
  return axios.put(
    `${baseUrl}/v2/admins/service/${modifyPetInfo.serviceId}`,
    body,
    { withCredentials: true }
  );
};

// 관리자 필수 서비스 수정
export const putAdminCriticalService = async (modifyPetInfo: any) => {
  const body = {
    serviceName: modifyPetInfo.serviceName,
    serviceImg: modifyPetInfo.serviceImg,
    serviceIntroduction: modifyPetInfo.serviceIntroduction,
  };
  return axios.put(
    `${baseUrl}/v2/admins/critical-service/${modifyPetInfo.serviceId}`,
    body,
    { withCredentials: true }
  );
};

// 관리자 펫시터 리스트 조회
export const getPetsitterList = async () => {
  return axios.get(`${baseUrl}/v2/admins/pet-sitters`, {
    withCredentials: true,
  });
};

// 관리자 펫시터 지원자 리스트 조회
export const getPetsitterApplicantList = async () => {
  return axios.get(`${baseUrl}/v2/admins/applicants`, {
    withCredentials: true,
  });
};

// 관리자 펫시터 지원자 상세 조회
export const getAdminApplicantDetail = async (userId: any) => {
  return axios.get(`${baseUrl}/v2/admins/applicants/${userId}`, {
    withCredentials: true,
  });
};

// 관리자 펫시터 지원자 수락
export const postAdminApplicantApprove = async (userId: any) => {
  return axios.patch(
    `${baseUrl}/v2/admins/accept-applicants/${userId}`,
    {},
    { withCredentials: true }
  );
};

// 관리자 펫시터 지원자 거절
export const postAdminApplicantRefuse = async (userId: any) => {
  return axios.patch(
    `${baseUrl}/v2/admins/refuse-applicant/${userId}`,
    {},
    { withCredentials: true }
  );
};
