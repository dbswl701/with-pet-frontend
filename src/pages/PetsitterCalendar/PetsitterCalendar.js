import React, { useState } from 'react';
import CalendarView from './CalendarView';
import PetsitterSidebar from '../../components/PetsitterSidebar/PetsitterSidebar';
import PetsitterEvaluation from './PetsitterEvaluation';
import PetsitterDiary from './PetsitterDiary';

function PetsitterCalendar() {
  const [printBody, setPrintBody] = useState(['main', 0]);
  let print = <CalendarView />;
  if (printBody[0] === 'main') {
    print = <CalendarView />;
    console.log('달력뷰');
  } else if (printBody[0] === 'eval') {
    print = <PetsitterEvaluation id={printBody[1]} setPrintBody={setPrintBody} />;
    console.log('평가뷰');
  } else {
    print = <PetsitterDiary id={printBody[1]} setPrintBody={setPrintBody} />;
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        <PetsitterSidebar setPrintBody={setPrintBody} />
        { print }
      </div>
    </>
  );
}

export default PetsitterCalendar;
