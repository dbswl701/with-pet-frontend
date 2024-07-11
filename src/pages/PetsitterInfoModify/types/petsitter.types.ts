// 펫시터 정보 초기 등록
export interface IPetSitterCriticalServices {
  criticalServiceId: number;
  petSitterCriticalServicePrice: number;
}
export interface IPetSitterHashTags {
  petSitterHashTagId?: number;
  petSitterHashTagName: string;
}
export interface IPetSitterHouses {
  petSitterHouseImg: string;
  petSitterHouseRepresentative: boolean;
  petSitterHouseId?: number;
}
export interface IPetSitterWithPetServices {
  petSitterWithPetServicePrice: number;
  withPetServiceId: number;
}
export interface IUpdatedInfo {
  petSitterCriticalServices: IPetSitterCriticalServices[];
  petSitterHashTags: IPetSitterHashTags[];
  petSitterHouses: IPetSitterHouses[];
  petSitterIntroduction: string;
  petSitterWithPetServices: IPetSitterWithPetServices[];
}
