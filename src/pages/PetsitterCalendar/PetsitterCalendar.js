import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import axios from 'axios';
import CalendarView from './CalendarView';
import PetsitterSidebar from '../../components/PetsitterSidebar/PetsitterSidebar';
import PetsitterEvaluation from './PetsitterEvaluation';
import PetsitterDiaries from '../PetsitterDiaries/PetsitterDiaries';

function PetsitterCalendar() {
  const [printBody, setPrintBody] = useState(['main', 0]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));
  const [eventsData, setEventsData] = useState([]);
  const colorList = ['#64C8F3', '#F36464', '#57DF86', '#DFDA57', '#CAA969', 'violet', 'gray'];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/reservation/petsitter/reservations?month=${selectedMonth}`, { withCredentials: true })
      .then((res) => {
        const { result } = res.data;
        const filtered = result.filter((item) => item.reservationStatus !== 'CANCEL');
        const temp = filtered.map((item) => ({
          start: new Date(item.checkIn),
          end: new Date(item.checkOut),
          color: colorList[(item.dogId % colorList.length) - 1],
          title: item.dogName,
          reservationId: item.reservationId,
        }));
        setEventsData(temp);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-alert
          alert('로그인이 필요한 서비스입니다.');
          navigate('/login');
        }
      });
  }, [selectedMonth]);

  let print = <CalendarView />;
  if (printBody[0] === 'main') {
    print = <CalendarView setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} eventsData={eventsData} />;
  } else if (printBody[0] === 'eval') {
    print = <PetsitterEvaluation id={printBody[1]} setPrintBody={setPrintBody} />;
  } else {
    print = <PetsitterDiaries id={printBody[1]} setPrintBody={setPrintBody} />;
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <PetsitterSidebar setPrintBody={setPrintBody} selectedMonth={selectedMonth} />
        { print }
      </div>
    </>
  );
}

export default PetsitterCalendar;
