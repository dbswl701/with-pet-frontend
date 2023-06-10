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
  // const [dayInfo, setDayInfo] = useState({
  //   categoryId: '',
  //   day: '',
  //   dogId: '',
  //   petsitterCheck: '',
  // });
  const [diaries, setDiaries] = useState([]);
  // const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));

  const onDayClick = (event) => {
    // 클릭 시 년월일(2023-05-17), 필터링된 dogid, categoryid를 건내준다.
    // console.log(event.start);
    // console.log(filter.categoryId);
    // console.log(filter.dogId);
    // setDayInfo({
    //   categoryId: filter.categoryId,
    //   day: event.start,
    //   dogId: filter.dogId,
    //   petsitterCheck: '',
    // });
    setOpen(true);
    // 이제 axios로 일별 일지 불러온다. -> ㄴㄴ 일지 불러오는거 들고옴
    // 날짜, 카테코리, 개 필터링 된 것들 전달

    // dayInfo 해서 axios를 여기서 호출
    axios.get(`https://withpet.site/api/v1/userdiaries/day?categoryId=${filter.categoryId}&day=${event.start}&dogId=${filter.dogId}&petsitterCheck=${filter.petsitterCheck}`, { withCredentials: true })
    // axios.get('https://withpet.site/api/v1/userdiaries/day?categoryId=&day=2023-05-20&dogId=', { withCredentials: true })
      .then((res) => {
        setDiaries(res.data.result);
        // console.log(res.data.result);
      })
      .catch(() => {
        // console.error(err);
      });
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

  const handleNavigate = (date) => {
    // 달 변경에 따른 정보 호출
    // console.log(dayjs(date).format('YYYY-MM'));
    // setSelectedMonth(dayjs(date).format('YYYY-MM'));
    // setFilteredDiaries();
    const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];
    setFilter({ ...filter, month: dayjs(date).format('YYYY-MM') });
    axios.get(`https://withpet.site/api/v1/userdiaries/month?categoryId=${filter.categoryId}&dogId=${filter.dogId}&month=${dayjs(date).format('YYYY-MM')}&petsitterCheck=${filter.petsitterCheck}`, { withCredentials: true })
      .then((res) => {
        const { result } = res.data;
        // 이제 달력 보여줄거 업데이트 하자
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
        style={{ height: '700px', width: '1000px', marginTop: '30px' }}
        // 눌렀을 때, 해당 일의 필터링된 일지를 확인할 수 있다.
        onSelectEvent={(event) => onDayClick(event)}
        // onSelectEvent={() => alert(filter.categoryId)}
        eventPropGetter={eventStyleGetter}
        onNavigate={handleNavigate}
      />
      <UserDiaryList diaries={diaries} open={open} setOpen={setOpen} setDiaries={setDiaries} />
    </div>
  );
}

export default CalendarView;
