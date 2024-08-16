// 메인 페이지 펫시터 목록

import { IPetSitterHashTags } from "../../PetsitterInfoModify/types/petsitter.types";

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
