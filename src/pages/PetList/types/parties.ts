import dayjs, { Dayjs } from "dayjs";

export interface IPartiesRes {
  partyId: number;
  partyName: string;
  partyLeaderName: string;
  partyLeaderId: string; // 오잉 여긴 email??
  partyLeaderImg: string;
  partyIsbn: string;
  partyMemberList: IPartyMemberList[];
  partyDogList: IPartyDogList[];
}

export interface IPartyMemberList {
  memberId: number;
  memberName: string;
  memberProfileImg: string;
}
export interface IPartyDogList {
  dogId: number;
  dogImg: string;
  dogName: string;
  dogBreed: string;
  dogGender: string;
  dogNeutralization: boolean;
  dogBirth: string; // date
  dogWeight: number;
  dogIsbn: string;
  dogSocializationTemperature: number;
  dogSocializationDegree: number;
  dogAffectionTemperature: number;
  dogSize: string;
}

// 파티 생성 req
export interface IPartyReq {
  partyDogBirth: dayjs.Dayjs; // date
  partyDogBreed: string;
  partyDogGender: string;
  partyDogImg: string;
  partyDogName: string;
  partyDogNeutralization: boolean;
  partyDogWeight: number;
  partyName: string;
  partyDogIsbn: string;
}

// 파티에 반려견 추가 req, res
export interface IAddPetReq {
  dogBirth: Dayjs | null; // 날짜
  dogBreed: string;
  dogGender: string;
  dogImg: string;
  dogIsbn: string;
  dogName: string;
  dogNeutralization: boolean;
  dogWeight: number;
}
export interface IAddPetRes {
  // 반려견 정보
  dogId: number;
  dogImg: string;
  dogName: string;
  dogBreed: string;
  dogGender: string;
  dogNeutralization: boolean;
  dogBirth: Date;
  dogWeight: number;
  dogIsbn: string;
  dogSocializationTemperature: number;
  dogSocializationDegree: number;
  dogAffectionTemperature: number;
  dogSize: string;
}

// // 반려견 정보 수정 req
export interface IModifyPetReq {
  dogBirth: string;
  dogBreed: string;
  dogGender: string;
  dogImg: string;
  dogName: string;
  dogNeutralization: boolean;
  dogWeight: number;
  // dogIsbn: string; // 이거 필요없음
}

// 그룹 가입 req
export interface IJoinPartyReq {
  partyIsbn: string;
}
