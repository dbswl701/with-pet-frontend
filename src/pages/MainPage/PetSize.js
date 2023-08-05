import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, option, theme) {
  return {
    fontWeight:
      option.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SelectLabels({ setOptions, options }) {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setOptions({
      ...options,
      size: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const petSize = [
    '소형견',
    '중형견',
    '대형견',
  ];

  return (
    <SelectWrapper className="option">
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span>반려견 크기</span>
        <Select
          className="select"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={options.size}
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} sx={{ backgroundColor: '#FAF6F0', color: '#caa969' }} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {petSize.map((size) => (
            <MenuItem
              key={size}
              value={size}
              style={getStyles(size, options.size, theme)}
            >
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectWrapper>
  );
}
