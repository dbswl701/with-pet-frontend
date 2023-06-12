import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import dayjs from 'dayjs';
import UserDiaryList from '../UserDiary/UserDiaryList';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

function CalendarView({
  filteredDiaries, filter, open, setOpen, setFilteredDiaries, setFilter,
}) {
  const [diaries, setDiaries] = useState([]);

  const onDayClick = (event) => {
    setOpen(true);
    axios.get(`https://withpet.site/api/v1/userdiaries/day?categoryId=${filter.categoryId}&day=${event.start}&dogId=${filter.dogId}&petsitterCheck=${filter.petsitterCheck}`, { withCredentials: true })
      .then((res) => {
        setDiaries(res.data.result);
      })
      .catch(() => {
      });
  };

  // 각 이벤트에 대한 스타일을 동적으로 지정하는 함수
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
    // 달 변경에 따른 정보 호출
    const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];
    setFilter({ ...filter, month: dayjs(date).format('YYYY-MM') });
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=${filter.categoryId}&dogId=${filter.dogId}&month=${dayjs(date).format('YYYY-MM')}&petsitterCheck=${filter.petsitterCheck}`, { withCredentials: true })
      .then((res) => {
        const { result } = res.data;
        const temp = result.map((item) => ({
          start: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          end: dayjs(new Date(item.createdAt)).format('YYYY-MM-DD'),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
        }));
        setFilteredDiaries(temp);
      })
      .catch(() => {

      });
  };

  return (
    <div className="App">
      <Calendar
        views={['month']}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={filteredDiaries}
        style={{ height: '700px', width: '1000px', marginTop: '30px' }}
        onSelectEvent={(event) => onDayClick(event)}
        eventPropGetter={eventStyleGetter}
        onNavigate={handleNavigate}
      />
      <UserDiaryList diaries={diaries} open={open} setOpen={setOpen} setDiaries={setDiaries} />
    </div>
  );
}

export default CalendarView;
