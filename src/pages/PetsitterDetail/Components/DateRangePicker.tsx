import { addDays, isWithinInterval } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetPetsitterUnvailableDates } from "../../../hooks/usePetsitterInfoMutation";
import dayjs from "dayjs";
import { IReservationInfo } from "../../PetList/types/petsitter";

interface IProps {
  petsitterId: string | undefined;
  setReservationInfo: React.Dispatch<React.SetStateAction<IReservationInfo>>;
}

function DateRangePicker({ petsitterId, setReservationInfo }: IProps) {
  // 필요한 것 - 제외되는 날짜, 날짜 핸들링 함수
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  // 달 확인
  const [monthCheck, setMonthCheck] = useState<string>(
    dayjs(new Date()).format("yyyy-mm")
  );
  const excludeDates = [addDays(new Date(), 1), addDays(new Date(), 5)];

  // 펫시터 예약 불가능한 날짜
  const { data: unvalidateDatesData } = useGetPetsitterUnvailableDates(
    petsitterId,
    monthCheck
  );
  const [unavailable, setUnavailable] = useState<string[]>([]);
  useEffect(() => {
    if (unvalidateDatesData) {
      setUnavailable(unvalidateDatesData);
    }
  }, [unvalidateDatesData]);
  console.log("제외되는 날짜 확인 unavailable:", unavailable);

  useEffect(() => {
    setMonthCheck(dayjs(startDate).format("YYYY-MM"));
  }, [startDate]);

  // 선택한 날짜가 excludeDates에 포함되어 있는지 확인
  const isExcludedInRange = (
    startDate: Date | null,
    endDate: Date | null
  ): boolean =>
    excludeDates.some((excludedDate) =>
      startDate && endDate
        ? isWithinInterval(excludedDate, { start: startDate, end: endDate })
        : false
    );

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    setStartDate(start!);
    if (end && isExcludedInRange(start, end)) {
      // end 가 있고, 범위 밖이라면 -> start로 다시 설정
      setEndDate(undefined);
      setStartDate(end);
      setDateLocal(end);
    } else {
      setEndDate(end!);
      setDateLocal(start!, end!);
    }
  };

  const setDateLocal = (start: Date, end?: Date) => {
    if (end) {
      setReservationInfo((prev: IReservationInfo) => ({
        ...prev,
        startDate: dayjs(start).format("YYYY-MM-DD"),
        endDate: dayjs(end).format("YYYY-MM-DD"),
      }));
    } else {
      setReservationInfo((prev: IReservationInfo) => ({
        ...prev,
        startDate: dayjs(start).format("YYYY-MM-DD"),
      }));
    }
  };
  console.log("시작 날짜 확인:", startDate, "끝 날짜 확인: ", endDate);
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      excludeDates={excludeDates}
      selectsRange
      monthsShown={2}
      selectsDisabledDaysInRange
      isClearable
    />
  );
}

export default DateRangePicker;
