import axios from "axios";
import baseUrl from "./api";

export interface IPetSitterReservationRes {
  reservationId: number;
  dogId: number;
  dogName: string;
  reservationCheckIn: string;
  reservationCheckOut: string;
  reservationStatus: string;
}

export interface IPetsitterCalendar {
  doneReservations: IDogInfo[];
  newReservations: IDogInfo[];
  useReservations: IDogInfo[];
  reservationMonthProfit: number;
}

export interface IDogInfo {
  dogAffectionTemperature: number;
  dogId: number;
  dogImg: string;
  dogName: string;
  dogSocializationDegree: number;
  dogSocializationTemperature: number;
  reservationCheckIn: string;
  reservationCheckOut: string;
  reservationCost: number;
  reservationId: number;
}

// 펫시터 월별 예약 조회
export const getPetsitterReservation = async (date: string) => {
  console.log("!!!!!");
  const res = await axios.get(
    `${baseUrl}/v2/pet-sitters/reservations?month=${date}`,
    { withCredentials: true }
  );
  console.log("data checl", res);
  return res.data.result as unknown as IPetSitterReservationRes[];
};

// 펫시터 월별 예약 사이드바
export const getPetsitterCalendar = async (date: string) => {
  const res = await axios.get(
    `${baseUrl}/v2/pet-sitters/reservations/side-infos?month=${date}`,
    { withCredentials: true }
  );

  console.log("data:::: ", res.data.result);

  return res.data.result as unknown as IPetsitterCalendar;
};

// 펫시터 캘린더 사이드바 예약 거절
export const patchPetsitterReservationRefuse = async (
  reservationId: number
) => {
  const res = await axios.patch(
    `${baseUrl}/v2/pet-sitters/reservations/refuse/${reservationId}`,
    {},
    { withCredentials: true }
  );

  return res.data.result as string;
};

// 펫시터 캘린더 사이드바 예약 승인
export const patchPetsitterReservationAccept = async (
  reservationId: number
) => {
  const res = await axios.patch(
    `${baseUrl}/v2/pet-sitters/reservations/approval/${reservationId}`,
    {},
    { withCredentials: true }
  );

  return res.data.result as unknown as IDogInfo;
};
