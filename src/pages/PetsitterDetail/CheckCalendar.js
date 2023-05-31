import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';

function ReservationPage({ onChange, petsitterId }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [focusedInputType, setFocusedInputType] = useState(null);
  const [unavailable, setUnavailable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));

  const handleDateChange = ({ startDate, endDate }) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
    onChange(startDate, endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInputType(focusedInput);
  };

  // const blockedDates = [
  //   new Date(2023, 4, 23), // May 13, 2023
  //   new Date(2023, 4, 26), // May 26, 2023
  //   new Date(2023, 4, 18), // May 18, 2023 (임의로 추가한 블록된 날짜)
  // ];
  const blockedDates = unavailable ? unavailable.map((date) => {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
  }) : [];

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.year()
      && date1.getMonth() === date2.month()
      && date1.getDate() === date2.date()
    );
  };

  const isReservationDateBlocked = (day) => {
    return blockedDates.some((date) => isSameDay(date, day));
  };

  const getClosestBlockedDate = (targetDate) => {
    const sortedDates = blockedDates.sort((a, b) => a - b);
    const closestDate = sortedDates.find((date) => date > targetDate);
    return closestDate ? moment(closestDate).startOf('day') : null;
  };

  const blockAfterStartDate = (day) => {
    if (checkInDate) {
      const closestBlockedDate = getClosestBlockedDate(checkInDate.toDate());
      if (closestBlockedDate) {
        return day.isSameOrAfter(closestBlockedDate);
      }
    }
    return false;
  };

  const blockBeforeStartDate = (day) => {
    if (checkInDate) {
      return day.isBefore(checkInDate, 'day');
    }
    return false;
  };

  // const handleMonthChange = (month) => {
  //   console.log(month);
  // };

  // 예약 불가능한 날짜 확인
  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/reservation?month=${selectedMonth}&petsitterId=${petsitterId}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        setUnavailable(res.data.result);
      });
  }, [selectedMonth]);

  const handleMonthChange = (item) => {
    // console.log(dayjs(new Date(item)).format('YYYY-MM'));
    setSelectedMonth(dayjs(new Date(item)).format('YYYY-MM'));
  };

  return (
    <div>
      <DateRangePicker
        startDate={checkInDate}
        startDateId="start_date"
        endDate={checkOutDate}
        endDateId="end_date"
        onDatesChange={handleDateChange}
        focusedInput={focusedInputType}
        onFocusChange={handleFocusChange}
        numberOfMonths={1}
        startDatePlaceholderText="체크인 날짜"
        endDatePlaceholderText="체크아웃 날짜"
        onPrevMonthClick={handleMonthChange} // 이전 달로 이동할 때 이벤트 발생
        onNextMonthClick={handleMonthChange}
        isDayBlocked={(day) => isReservationDateBlocked(day)
          || blockBeforeStartDate(day)
          || blockAfterStartDate(day)}
      />
    </div>
  );
}

export default ReservationPage;
