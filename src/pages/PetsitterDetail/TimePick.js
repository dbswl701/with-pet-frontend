import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { styled } from '@mui/material/styles';

const StyledTime = styled(TimePicker)({
  position: 'relative',
  width: 'auto',
});

export default function TimePickerValue() {
  const [startValue, setStartValue] = React.useState(dayjs('2022-04-17T15:30'));
  const [endValue, setEndValue] = React.useState(dayjs('2022-04-17T15:30'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h6>체크인/체크아웃 시간</h6>
      <DemoContainer components={['TimePicker', 'TimePicker']}>
        <StyledTime>
        <TimePicker
          value={startValue}
          onChange={(newStartValue) => setStartValue(newStartValue)}
        />
        </StyledTime>
        <StyledTime>
        <TimePicker
          value={endValue}
          onChange={(newEndValue) => setEndValue(newEndValue)}
        />
        </StyledTime>
      </DemoContainer>
    </LocalizationProvider>
  );
}
