import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import moment from 'moment';

function ReservationPage({ blockdays }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [focusedInputType, setFocusedInputType] = useState(null);

  const handleDateChange = ({ startDate, endDate }) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInputType(focusedInput);
  };

  // const blockedDates = [
  //   new Date(2023, 4, 23), // May 13, 2023
  //   new Date(2023, 4, 26), // May 26, 2023
  //   new Date(2023, 4, 18), // May 18, 2023 (임의로 추가한 블록된 날짜)
  // ];
  const blockedDates = blockdays && blockdays.map((date) => {
    const [year, month, day] = date.split('-');
    return new Date(year, month - 1, day);
  });

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

  return (
    <div>
      <h2>Reservation Page</h2>
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
          isDayBlocked={(day) => isReservationDateBlocked(day)
            || blockBeforeStartDate(day)
            || blockAfterStartDate(day)}
        />
      </div>
      <div>
        {checkInDate && checkOutDate && (
          <p>
            Selected Range: {checkInDate.format('YYYY-MM-DD')} - {checkOutDate.format('YYYY-MM-DD')}
          </p>
        )}
      </div>
    </div>
  );
}

export default ReservationPage;
