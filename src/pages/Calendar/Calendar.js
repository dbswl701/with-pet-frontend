import React from 'react';
import UserSidebar from '../../components/UserSidebar/UserSidebar';

function Calendar() {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <UserSidebar />
        <div>반려인의 캘린더뷰 페이지</div>
      </div>
    </>
  );
}

export default Calendar;
