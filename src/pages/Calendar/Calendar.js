import React, { useState } from 'react';
import UserSidebar from '../../components/UserSidebar/UserSidebar';
import CalendarView from './CalendarView';

function Calendar() {
  const [filteredDiaries, setFilteredDiaries] = useState([]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <UserSidebar setFilteredDiaries={setFilteredDiaries} />
        {/* <div>반려인의 캘린더뷰 페이지</div> */}
        <CalendarView filteredDiaries={filteredDiaries} />
      </div>
    </>
  );
}

export default Calendar;
