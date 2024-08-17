import { addDays, isWithinInterval } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateRangePicker() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  const excludeDates = [addDays(new Date(), 1), addDays(new Date(), 5)];

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

    // 선택한 날짜가 excludeDates에 포함되어 있는지 확인
    const isExcluded = (date: Date | null): boolean =>
      date
        ? excludeDates.some((excludedDate) =>
            isWithinInterval(excludedDate, {
              start: start || date,
              end: end || start || date,
            })
          )
        : false;

    setStartDate(start!);
    if (end && isExcludedInRange(start, end)) {
      // end 가 있고, 범위 밖이라면 -> start로 다시 설정
      setEndDate(undefined);
      setStartDate(end);
    } else {
      setEndDate(end!);
    }
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      minDate={new Date()}
      excludeDates={excludeDates}
      selectsRange
      selectsDisabledDaysInRange
      inline
    />
  );
}

export default DateRangePicker;
