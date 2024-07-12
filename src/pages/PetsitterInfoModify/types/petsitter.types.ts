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

// response
export interface IPetSitterCriticalServicesRes {
  petSitterCriticalServiceId: number;
  criticalServiceId: number;
  criticalServiceName: string;
  criticalServiceIntroduction: string;
  criticalServiceImg: string;
  petSitterCriticalServicePrice: number;
}

export interface ICriticalServicesRes {
  criticalServiceId: number;
  criticalServiceName: string;
  criticalServiceImg: string;
  criticalServiceIntroduction: string;
}

export interface IPetSitterWithPetServicesRes {
  petSitterWithPetServiceId: number;
  withPetServiceId: number;
  withPetServiceName: string;
  withPetServiceIntroduction: string;
  withPetServiceImg: string;
  petSitterWithPetServicePrice: number;
}

export interface IWithPetServicesRes {
  withPetServiceId: number;
  withPetServiceName: string;
  withPetServiceImg: string;
  withPetServiceIntroduction: string;
}
export interface IPetSitterInfoRes {
  petSitterHouses: IPetSitterHouses[];
  petSitterHashTags: IPetSitterHashTags[];
  petSitterIntroduction: string;
  petSitterLicenseImg: string;
  petSitterCriticalServices: IPetSitterCriticalServicesRes[];
  criticalServices: ICriticalServicesRes[];
  petSitterWithPetServices: IPetSitterWithPetServicesRes[];
  withPetServices: IWithPetServicesRes[];
}

// 서비스 포함 여부
export interface IIncludedServices {
  isIncluded: boolean;
  petSitterWithPetServicePrice: number | null;
  withPetServiceId: number;
  withPetServiceImg: string;
  withPetServiceIntroduction: string;
  withPetServiceName: string;
}
