import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

// 체크인 체크아웃
export default function DatePick() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['DateRangePicker']}
      >
        <h6>체크인/체크아웃 날짜</h6>
        <DemoItem component="DateRangePicker">
          <DateRangePicker calendars={1} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
