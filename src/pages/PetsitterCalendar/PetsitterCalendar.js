import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalendarView from './CalendarView';
import PetsitterSidebar from '../../components/PetsitterSidebar/PetsitterSidebar';
import PetsitterEvaluation from './PetsitterEvaluation';
import PetsitterDiary from './PetsitterDiary';

function PetsitterCalendar() {
  const [printBody, setPrintBody] = useState(['main', 0]);
  const [selectedMonth, setSelectedMonth] = useState(dayjs(new Date()).format('YYYY-MM'));

  let print = <CalendarView />;
  // console.log(selectedMonth);
  if (printBody[0] === 'main') {
    print = <CalendarView setSelectedMonth={setSelectedMonth} selectedMonth={selectedMonth} />;
  } else if (printBody[0] === 'eval') {
    print = <PetsitterEvaluation id={printBody[1]} setPrintBody={setPrintBody} />;
  } else {
    print = <PetsitterDiary id={printBody[1]} setPrintBody={setPrintBody} />;
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
