import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPetsitterCalendar,
  getPetsitterReservation,
  IDogInfo,
  patchPetsitterReservationAccept,
  patchPetsitterReservationRefuse,
} from "../services/petsitterReservation";
import { toast } from "react-toastify";

// 펫시터 월별 예약 확인
export const useGetPetsitterReservation = (date: string) => {
  console.log("???/");
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitterReservation", date],
    queryFn: () => getPetsitterReservation(date),
    staleTime: 5 * 1000,
  });
  return { data, isLoading, error };
};

// 펫시터 월별 예약 사이드바
export const useGetPetsitterCalendar = (date: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["petsitterCalendar", date],
    queryFn: () => getPetsitterCalendar(date),
    staleTime: 5 * 1000,
  });
  return { data, isLoading, error };
};

// 펫시터 캘린더 사이드바 예약 거절
export const usePatchPetsitterReservationRefuse = () => {
  return useMutation({
    mutationFn: ({
      reservationId,
      handleRemoveNew,
      handleApprove,
    }: {
      reservationId: number;
      handleRemoveNew: (id: number) => void;
      handleApprove: (id: number, reservation: IDogInfo) => void;
    }) => patchPetsitterReservationRefuse(reservationId),
    onError: (error) => {
      console.log("예약 거절 에러", error);
      // toast.error("로그인 실패");
    },
    onSuccess: (data, variables, context) => {
      console.log("예약 거절 성공", data);
      // toast.success(data.data.result);
      toast.success("해당 예약을 거절하였습니다.");
      variables.handleRemoveNew(variables.reservationId);
      // variables.handleApprove(variables.reservationId, data);
    },
  });
};

// 펫시터 캘린더 사이드바 예약 승인
export const usePatchPetsitterReservationAccept = () => {
  return useMutation({
    mutationFn: ({
      reservationId,
      handleRemoveNew,
      handleApprove,
    }: {
      reservationId: number;
      handleRemoveNew: (id: number) => void;
      handleApprove: (id: number, reservation: IDogInfo) => void;
    }) => patchPetsitterReservationAccept(reservationId),
    onError: (error) => {
      console.log("예약 승인 에러", error);
      // toast.error("로그인 실패");
    },
    onSuccess: (data, variables, context) => {
      console.log("예약 승인 성공", data);
      // toast.success(data.data.result);
      toast.success("해당 예약을 승인하였습니다.");
      variables.handleRemoveNew(variables.reservationId);
      variables.handleApprove(variables.reservationId, data);
    },
  });
};
