import { useQuery } from "@tanstack/react-query";
import {
  getPetsitterCalendar,
  getPetsitterReservation,
} from "../services/petsitterReservation";

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
