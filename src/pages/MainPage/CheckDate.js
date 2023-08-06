import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
// import moment from 'moment';
// import axios from 'axios';
// import dayjs from 'dayjs';
// import TextField from '@mui/material/TextField';
import './datePicker.css';
import FormControl from '@mui/material/FormControl/FormControl';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

export default function CheckDate({ options, setOptions }) {
  // const [open, setOpen] = React.useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [focusedInputType, setFocusedInputType] = useState(null);
  // const [unavailable, setUnavailable] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));

  const onChangeCalender = (start, end) => {
    if (start && end) {
      setOptions({
        ...options,
        startDate: start.format('YYYY-MM-DD'),
        endDate: end.format('YYYY-MM-DD'),
      });
    }
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setCheckInDate(startDate);
    setCheckOutDate(endDate);
    onChangeCalender(startDate, endDate);
  };

  const handleFocusChange = (focusedInput) => {
    setFocusedInputType(focusedInput);
  };

  // const blockedDates = unavailable ? unavailable.map((date) => {
  //   const [year, month, day] = date.split('-');
  //   return new Date(year, month - 1, day);
  // }) : [];

  // const isSameDay = (date1, date2) => {
  //   return (
  //     date1.getFullYear() === date2.year()
  //     && date1.getMonth() === date2.month()
  //     && date1.getDate() === date2.date()
  //   );
  // };

  // const isReservationDateBlocked = (day) => {
  //   return blockedDates.some((date) => isSameDay(date, day));
  // };

  // const getClosestBlockedDate = (targetDate) => {
  //   const sortedDates = blockedDates.sort((a, b) => a - b);
  //   const closestDate = sortedDates.find((date) => date > targetDate);
  //   return closestDate ? moment(closestDate).startOf('day') : null;
  // };

  // const blockAfterStartDate = (day) => {
  //   if (checkInDate) {
  //     const closestBlockedDate = getClosestBlockedDate(checkInDate.toDate());
  //     if (closestBlockedDate) {
  //       return day.isSameOrAfter(closestBlockedDate);
  //     }
  //   }
  //   return false;
  // };

  // const blockBeforeStartDate = (day) => {
  //   if (checkInDate) {
  //     return day.isBefore(checkInDate, 'day');
  //   }
  //   return false;
  // };

  useEffect(() => {
    setCheckInDate(null);
    setCheckOutDate(null);
  }, []);

  // useEffect(() => {
  //   axios.get(`https://withpet.site/api/v1/reservation?month=${selectedMonth}&petsitterId=${petsitterId}`, { withCredentials: true })
  //     .then((res) => {
  //       setUnavailable(res.data.result);
  //     });
  // }, [selectedMonth]);

  // const handleMonthChange = (item) => {
  //   setSelectedMonth(dayjs(new Date(item)).format('YYYY-MM'));
  // };

  return (
    <SelectWrapper>
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <p style={{ fontWeight: 'bold' }}>체크인 / 체크아웃</p>
        <DateRangePicker
          required
          style={{ width: '500px', backgroundColor: 'green' }}
          small
          startDate={checkInDate}
          startDateId="start_date"
          endDate={checkOutDate}
          endDateId="end_date"
          onDatesChange={handleDateChange}
          focusedInput={focusedInputType}
          onFocusChange={handleFocusChange}
          numberOfMonths={2}
          startDatePlaceholderText="체크인 날짜"
          endDatePlaceholderText="체크아웃 날짜"
          // onPrevMonthClick={handleMonthChange}
          // onNextMonthClick={handleMonthChange}
          // isDayBlocked={(day) => isReservationDateBlocked(day)
          //   || blockBeforeStartDate(day)
          //   || blockAfterStartDate(day)}
        />
      </FormControl>
    </SelectWrapper>
  );
}
