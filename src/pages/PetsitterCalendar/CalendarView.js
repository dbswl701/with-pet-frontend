import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ModalDogInfo from './ModalDogInfo';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function CalendarView({ setSelectedMonth, eventsData }) {
  const [dogInfo, setDogInfo] = useState({});
  const [open, setOpen] = useState(false);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;

    const style = {
      backgroundColor,
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
      display: 'block',
    };

    return {
      style,
    };
  };

  const handleNavigate = (date) => {
    setSelectedMonth(dayjs(date).format('YYYY-MM'));
  };

  const onDogClick = (event) => {
    setOpen(true);
    axios.get(`https://withpet.site/api/v1/reservation/show-payment/${event.reservationId}`, { withCredentials: true })
      .then((res) => {
        setDogInfo(res.data.result);
      })
      .catch(() => {
      });
  };

  return (
    <div className="App">
      <div>
        <Calendar
          classsName="calendar"
          views={['month']}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          onSelectEvent={(event) => onDogClick(event)}
          style={{ height: '700px', width: '1000px', marginTop: '30px' }}
          eventPropGetter={eventStyleGetter}
          onNavigate={handleNavigate}
        />
        <ModalDogInfo open={open} setOpen={setOpen} dogInfo={dogInfo} />
      </div>
    </div>
  );
}

export default CalendarView;
