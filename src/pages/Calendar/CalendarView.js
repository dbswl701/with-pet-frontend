import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function CalendarView({ filteredDiaries }) {
  const onDayClick = () => {
    // 클릭 시 년월일(2023-05-17), 필터링된 dogid, categoryid를 건내준다.
  };

  // 각 이벤트에 대한 스타일을 동적으로 지정하는 함수
  const eventStyleGetter = (event) => {
    // const borderColor = '#000000'; // 바의 테두리색
    const backgroundColor = event.color;

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
        events={filteredDiaries}
        style={{ height: '700px', width: '1000px' }}
        // 눌렀을 때, 해당 일의 필터링된 일지를 확인할 수 있다.
        onSelectEvent={onDayClick}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default CalendarView;
