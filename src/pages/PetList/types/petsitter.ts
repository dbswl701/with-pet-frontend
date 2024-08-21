// 메인 페이지 펫시터 목록

import {
  IPetSitterCriticalServicesRes,
  IPetSitterHashTags,
  IPetSitterHouses,
  IPetSitterWithPetServicesRes,
} from "../../PetsitterInfoModify/types/petsitter.types";

export interface IPetsitterList {
  content: IContent[];
  pageable: IPageable;
  last: boolean;
  totalPages?: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface IPageable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IContent {
  petSitterName: string;
  petSitterId: number;
  petSitterRepresentativeHouse: string;
  petSitterHashTags: IPetSitterHashTags[]; // 다시 확인
  petSitterReviewCount: number;
  petSitterStartRate: null;
}

// 펫시터 디테일 정보
export interface IPetsitterDetail {
  petSitterId: number;
  petSitterUserId: number;
  petSitterName: string;
  petSitterProfileImg: string;
  petSitterAddress: string;
  petSitterHashTags: IPetSitterHashTags[]; // 다시 확인
  petSitterHouses: IPetSitterHouses[];
  petSitterWithPetServices: IPetSitterWithPetServicesRes[]; // 다시 확인
  petSitterCriticalServices: IPetSitterCriticalServicesRes[]; // 다시 확인
  petSitterIntroduction: string;
  petSitterLicenseImg: string;
  petSitterReviews: [];
}

// 예약 페이지 반려견 리스트 조회
export interface IReservationDogs {
  dogId: number;
  name: string;
  petReservationAvailable: boolean;
}

// 유저의 펫시터 예약 정보 (유저 데이터)
export interface IReservationInfo {
  startDate: string;
  endDate: string;
  checkinTime: string;
  checkoutTime: string;
  dogId: string;
  optionId: number[];
}

// 유저의 펫시터 예약 정보 (서버에 데이터)
export interface IReservationInfoReq {
  dogId: number;
  petSitterId: number;
  reservationCheckIn: string;
  reservationCheckOut: string;
  reservationOptionIdList: number[];
}
