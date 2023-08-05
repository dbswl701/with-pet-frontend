import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

export default function MultipleSelectChip({ services, setOptions, options }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setOptions({
      ...options,
      services: typeof value === 'string' ? value.split(',') : value,
    });
  };
  return (
    <SelectWrapper className="option">
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span>옵션</span>
        <Select
          multiple
          value={options.services}
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
          {services.map((service) => (
            <MenuItem
              key={service.serviceId}
              value={service.serviceName}
            >
              {service.serviceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectWrapper>
  );
}
