import React from 'react';
import CalendarView from './CalendarView';
import PetsitterSidebar from '../../components/PetsitterSidebar/PetsitterSidebar';

function PetsitterCalendar() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <PetsitterSidebar />
        {/* <div>펫시터 메인페이지(캘린더뷰, 예약 내역 확인)</div> */}
        <CalendarView />
      </div>
    </>
  );
}

export default PetsitterCalendar;
