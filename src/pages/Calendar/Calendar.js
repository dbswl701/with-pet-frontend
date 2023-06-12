import React, { useState } from 'react';
import dayjs from 'dayjs';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import CalendarView from './CalendarView';

function Calendar() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openDay, setOpenDay] = useState(false);
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
        <UserSidebar open={openAdd} setOpen={setOpenAdd} setFilteredDiaries={setFilteredDiaries} filteredDiaries={filteredDiaries} filter={filter} setFilter={setFilter} />
        <CalendarView open={openDay} setOpen={setOpenDay} filteredDiaries={filteredDiaries} filter={filter} setFilteredDiaries={setFilteredDiaries} setFilter={setFilter} />
      </div>
    </>
  );
}

export default Calendar;
