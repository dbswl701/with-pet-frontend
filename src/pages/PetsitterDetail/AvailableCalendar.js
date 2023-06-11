import React, { useState, useEffect } from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import dayjs from 'dayjs';
import axios from 'axios';

function ReservationPage({ petsitterId }) {
  const [unavailable, setUnavailable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));

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
    const today = new Date();
    return (
      blockedDates.some((date) => isSameDay(date, day)) || day.isBefore(today, 'day') // 오늘 이전의 날짜
    );
  };

  const handleMonthChange = (item) => {
    setSelectedMonth(dayjs(new Date(item)).format('YYYY-MM'));
  };
  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/reservation?month=${selectedMonth}&petsitterId=${petsitterId}`, { withCredentials: true })
      .then((res) => {
        setUnavailable(res.data.result);
      });
  }, [selectedMonth]);
  return (
    <div>
      <h2>예약 가능한 날짜</h2>
      <div>
        <DayPickerRangeController
          numberOfMonths={1}
          isDayBlocked={(day) => isReservationDateBlocked(day)}
          onPrevMonthClick={handleMonthChange}
          onNextMonthClick={handleMonthChange}
        />
      </div>
    </div>
  );
}

export default ReservationPage;
