import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl/FormControl';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

const regionList = [
  { region: '팔달구', city: '수원' },
  { region: '영통구', city: '수원' },
  { region: '장안구', city: '수원' },
  { region: '권선구', city: '수원' },
  { region: '양천구', city: '서울' },
  { region: '강서구', city: '서울' },
  { region: '서대문구', city: '서울' },
];

export default function Asynchronous({ options, setOptions }) {
  const [open, setOpen] = React.useState(false);

  const onChange = (event, value) => {
    if (!value) {
      setOptions({
        ...options,
        region: '',
      });
    } else {
      setOptions({
        ...options,
        region: value.region,
      });
    }
  };
  return (
    <SelectWrapper>
      <FormControl sx={{ m: 1, width: 4 / 5, display: 'flex' }}>
        <span>지역</span>
        <Autocomplete
          className="select"
          id="asynchronous-demo"
          sx={{ width: 1 }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.region === value.region}
          getOptionLabel={(option) => option.region}
          options={regionList}
          renderInput={(params) => (
            <TextField
              className="select"
          // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          onChange={onChange}
        />
      </FormControl>
    </SelectWrapper>
  );
}
