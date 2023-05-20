import React, { useState } from 'react';
import dayjs from 'dayjs';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import CalendarView from './CalendarView';

function Calendar() {
  const [openAdd, setOpenAdd] = useState(false); // 모달창
  const [openDay, setOpenDay] = useState(false); // 모달창
  const [filteredDiaries, setFilteredDiaries] = useState([]);
  const [filter, setFilter] = useState({
    dogId: '',
    categoryId: '',
    month: dayjs(new Date()).format('YYYY-MM'),
    petsitterCheck: '',
  });
  return (
    <>
      <div style={{ display: 'flex' }}>
        <UserSidebar open={openAdd} setOpen={setOpenAdd} setFilteredDiaries={setFilteredDiaries} filter={filter} setFilter={setFilter} />
        {/* <div>반려인의 캘린더뷰 페이지</div> */}
        <CalendarView open={openDay} setOpen={setOpenDay} filteredDiaries={filteredDiaries} filter={filter} />
      </div>
    </>
  );
}

export default Calendar;
