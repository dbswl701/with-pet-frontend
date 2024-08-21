import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getPetsitterDetail,
  getPetsitterMyInfo,
  getPetsitterUnvailableDates,
  getReservationDogs,
  postReservation,
  putPetsitterCriticalService,
} from "../services/petsitter";
import { IPetSitterCriticalServices } from "../pages/PetsitterInfoModify/types/petsitter.types";
import { toast } from "react-toastify";
import { IReservationInfoReq } from "../pages/PetList/types/petsitter";

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

// 펫시터 예약 불가능한 날짜
export const useGetPetsitterUnvailableDates = (
  petsitterId: string | undefined,
  month: string
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitter", "unvaliable-dates", petsitterId],
    queryFn: () => getPetsitterUnvailableDates(petsitterId, month),
    staleTime: 5 * 60 * 1000,
  });
  return { data, isLoading, error };
};

// 유저의 펫시터 예약
export const usePostReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: IReservationInfoReq) => postReservation(req),
    onSuccess: (data, variables, context) => {
      toast.success("예약 성공");
      // 엥 예약 정보가 query로 관리되어야 하나?
      // const { setPayInfo, setOpen } = context;
      // console.log("variables 확인", variables);
      queryClient.setQueryData<boolean>(["isOpenPayModal"], () => {
        return true;
      });
      queryClient.setQueryData(["payInfo"], () => {
        return data;
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
