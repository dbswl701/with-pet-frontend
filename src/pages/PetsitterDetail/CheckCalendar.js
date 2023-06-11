import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';

function ReservationPage({ onChange, petsitterId, reset }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [focusedInputType, setFocusedInputType] = useState(null);
  const [unavailable, setUnavailable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));
  const [isSelectionComplete, setIsSelectionComplete] = useState(false); // 체크인 및 체크아웃 날짜 선택 여부

  const handleDateChange = ({ startDate, endDate }) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
    onChange(startDate, endDate);
    setIsSelectionComplete(!!startDate && !!endDate); // 선택 여부 업데이트
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInputType(focusedInput);
  };

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

  useEffect(() => {
    setCheckInDate(null);
    setCheckOutDate(null);
  }, [reset]);

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/reservation?month=${selectedMonth}&petsitterId=${petsitterId}`, { withCredentials: true })
      .then((res) => {
        setUnavailable(res.data.result);
      });
  }, [selectedMonth]);

  const handleMonthChange = (item) => {
    setSelectedMonth(dayjs(new Date(item)).format('YYYY-MM'));
  };

  return (
    <div>
      <DateRangePicker
        required
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
        onPrevMonthClick={handleMonthChange}
        onNextMonthClick={handleMonthChange}
        isDayBlocked={(day) => isReservationDateBlocked(day)
          || blockBeforeStartDate(day)
          || blockAfterStartDate(day)}
      />
      {!isSelectionComplete && <p style={{ color: 'red', fontSize: '11px', margin: '0px' }}>체크인 및 체크아웃 날짜를 선택해주세요.</p>}
    </div>
  );
}

export default ReservationPage;
