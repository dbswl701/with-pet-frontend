import React from 'react';
import { DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

function ReservationPage() {
  const blockedDates = [
    new Date(2023, 4, 23), // May 13, 2023
    new Date(2023, 4, 26), // May 26, 2023
    new Date(2023, 4, 18), // May 18, 2023 (임의로 추가한 블록된 날짜)
  ];

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
