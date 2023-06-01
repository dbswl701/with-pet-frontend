import React from 'react';
import { useTheme } from '@mui/material/styles';
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

// const optionlist = [
//   '목욕', '배변', '산책', '미용',
// ];

function getStyles(name, option, theme) {
  return {
    fontWeight:
      option.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip({ services, setOptions, options }) {
  const theme = useTheme();
  // const [option, setoption] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // setoption(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );
    // console.log(options);
    setOptions({
      ...options,
      services: typeof value === 'string' ? value.split(',') : value,
    });
  };
  // console.log(options);
  return (
    <SelectWrapper className="option">
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span>옵션</span>
        <Select
          className="select"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
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
              style={getStyles(service.serviceName, options.services, theme)}
            >
              {service.serviceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectWrapper>
  );
}
