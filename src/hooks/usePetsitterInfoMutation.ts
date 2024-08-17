import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPetsitterDetail,
  getPetsitterMyInfo,
  getReservationDogs,
  putPetsitterCriticalService,
} from "../services/petsitter";
import { IPetSitterCriticalServices } from "../pages/PetsitterInfoModify/types/petsitter.types";
import { toast } from "react-toastify";

// 펫시터 자기 정보 확인
export const useGetPetsitterInfoQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitterInfo"],
    queryFn: getPetsitterMyInfo,
    staleTime: 5 * 1000,
  });
  return { data, isLoading, error };
};

// 펫시터 필수 서비스 수정
export const usePostCriticalService = () => {
  return useMutation({
    mutationFn: (
      petSitterCriticalServiceRequests: IPetSitterCriticalServices[]
    ) => putPetsitterCriticalService(petSitterCriticalServiceRequests),
    onError: (error) => {
      console.log("필수 서비스 수정 실패", error);
      // toast.error("로그인 실패");
    },
    onSuccess: (data) => {
      console.log("필수 서비스 수정 성공", data);
      toast.success(data.data.result);
    },
  });
};

// 펫시터 디테일 정보 불러오기
export const useGetPetsitterDetail = (petSitterId: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitterDetail", petSitterId],
    queryFn: () => getPetsitterDetail(petSitterId),
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, error };
};

// 예약 페이지 반려견 리스트 조회
export const useGetReservationDogs = (petsitterId: string | undefined) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["reservationDogs", petsitterId],
    queryFn: () => getReservationDogs(petsitterId),
    staleTime: 5 * 60 * 1000,
  });
  return { data, isLoading, error };
};
