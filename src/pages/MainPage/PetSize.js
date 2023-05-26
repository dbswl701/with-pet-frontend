import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

export default function SelectLabels() {
  const [size, setSize] = React.useState('');

  const handleChange = (event) => {
    setSize(event.target.value);
  };

  return (
    <SelectWrapper id="petsize">
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span id="txt">반려견 크기</span>
        <Select
          className="select"
          value={size}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={10}>소</MenuItem>
          <MenuItem value={20}>중</MenuItem>
          <MenuItem value={30}>대</MenuItem>
        </Select>
      </FormControl>
    </SelectWrapper>
  );
}
