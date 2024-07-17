import axios from "axios";
import baseUrl from "./api";
import {
  IAddPetReq,
  IAddPetRes,
  IPartiesRes,
  IPartyReq,
} from "../pages/PetList/types/parties";

// 반려견 파티 정보 불러오기
export const getPetPartiesInfo = async () => {
  const res = await axios.get(`${baseUrl}/v2/parties`, {
    withCredentials: true,
  });

  return res.data.result as IPartiesRes[];
};

// 반려견 파티 생성
export const postPetPartyCreate = async (petInfo: IPartyReq) => {
  const res = await axios.post(`${baseUrl}/v2/parties`, petInfo, {
    withCredentials: true,
  });

  return res.data.result as unknown as IPartiesRes;
};

// 파티에 반려견 추가
export const postDogIntoParty = async (
  partyId: number,
  dogInfo: IAddPetReq,
) => {
  const res = await axios.post(`${baseUrl}/v2/dogs/${partyId}`, dogInfo, {
    withCredentials: true,
  });
  return res.data.result as unknown as IAddPetRes;
};
