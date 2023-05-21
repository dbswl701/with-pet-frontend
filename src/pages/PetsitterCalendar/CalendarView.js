import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
// import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function CalendarView() {
  const [eventsData, setEventsData] = useState([]);

  // const colorList = ['red', 'yellow', 'green', 'blue', 'orange', 'violet', 'gray'];
  const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/reservation/petsitter/reservations?month=2023-05', { withCredentials: true })
      .then((res) => {
        // setEventsData(res.data.result);
        const { result } = res.data;
        const temp = result.map((item) => ({
          start: new Date(item.checkIn),
          end: new Date(item.checkOut),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        // console.log(res.data.result);
        // console.log(temp);
        setEventsData(temp);
      })
      .catch(() => {});
  }, []);

  // setEventsData([
  //   ...eventsData,
  //   {
  //     start,
  //     end,
  //     title,
  //   },
  // ]);

  // 각 이벤트에 대한 스타일을 동적으로 지정하는 함수
  const eventStyleGetter = (event) => {
  // const backgroundColor = "#ff0000"; // 바의 배경색
    // const borderColor = '#000000'; // 바의 테두리색
    const backgroundColor = event.color; // 이벤트의 color 속성으로 색상 지정

    const style = {
      backgroundColor,
      // borderColor,
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
      display: 'block',
    };

    return {
      style,
    };
  };
  return (
    <div className="App">
      <Calendar
        views={['month']}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: '700px', width: '1000px' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default CalendarView;
