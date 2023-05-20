import React, { useState } from 'react';
import CalendarView from './CalendarView';
import PetsitterSidebar from '../../components/PetsitterSidebar/PetsitterSidebar';
import PetsitterEvaluation from './PetsitterEvaluation';

function PetsitterCalendar() {
  const [printBody, setPrintBody] = useState(['main', 0]);
  let print = <CalendarView />;
  if (printBody[0] === 'main') {
    print = <CalendarView />;
    console.log('달력뷰');
  } else if (printBody[0] === 'eval') {
    print = <PetsitterEvaluation id={printBody[1]} setPrintBody={setPrintBody} />;
    console.log('평가뷰');
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
