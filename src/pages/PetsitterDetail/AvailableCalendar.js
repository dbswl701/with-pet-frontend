import React from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

function ReservationPage({ unavailable }) {
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
    const today = new Date(); // 오늘 날짜
    return (
      blockedDates.some((date) => isSameDay(date, day)) || day.isBefore(today, 'day') // 오늘 이전의 날짜
    );
  };

  return (
    <div>
      <h2>예약 가능한 날짜</h2>
      <div>
        <DayPickerRangeController
          numberOfMonths={1}
          isDayBlocked={(day) => isReservationDateBlocked(day)}
        />
      </div>
    </div>
  );
}

export default ReservationPage;
