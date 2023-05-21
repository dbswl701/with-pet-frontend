import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import UserDiaryList from '../UserDiary/UserDiaryList';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function CalendarView({
  filteredDiaries, filter, open, setOpen,
}) {
  const [dayInfo, setDayInfo] = useState({
    categoryId: '',
    day: '',
    dogId: '',
    petsitterCheck: '',
  });
  const onDayClick = (event) => {
    // 클릭 시 년월일(2023-05-17), 필터링된 dogid, categoryid를 건내준다.
    // console.log(event.start);
    // console.log(filter.categoryId);
    // console.log(filter.dogId);
    setDayInfo({
      categoryId: filter.categoryId,
      day: event.start,
      dogId: filter.dogId,
      petsitterCheck: '',
    });
    setOpen(true);
    // 이제 axios로 일별 일지 불러온다. -> ㄴㄴ 일지 불러오는거 들고옴
    // 날짜, 카테코리, 개 필터링 된 것들 전달
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

  // console.log(filteredDiaries);
  // filter.categoryId
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
        onSelectEvent={(event) => onDayClick(event)}
        // onSelectEvent={() => alert(filter.categoryId)}
        eventPropGetter={eventStyleGetter}
      />
      <UserDiaryList dayInfo={dayInfo} open={open} setOpen={setOpen} />
    </div>
  );
}

export default CalendarView;
