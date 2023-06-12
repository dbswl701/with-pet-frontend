import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

export default function SelectLabels({ setOptions, options }) {
  const handleChange = (event) => {
    setOptions({
      ...options,
      size: event.target.value,
    });
  };

  return (
    <SelectWrapper id="petsize">
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span id="txt">반려견 크기</span>
        <Select
          className="select"
          value={options.size}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="소형견">소형견</MenuItem>
          <MenuItem value="중형견">중형견</MenuItem>
          <MenuItem value="대형견">대형견</MenuItem>
        </Select>
      </FormControl>
    </SelectWrapper>
  );
}
