import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl/FormControl';
import { SelectWrapper } from '../../styles/main/MainPageStyle';

// function sleep(delay = 0) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, delay);
//   });
// }

const regionList = [
  { region: '영통구', city: '수원' },
  { region: '영동구', city: '수원' },
  { region: '용답동', city: '서울' },
  { region: '성수동', city: '서울' },
  { region: '상수동', city: '서울' },
  { region: '별양동', city: '과천' },
  { region: '중앙동', city: '과천' },
  { region: '문원동', city: '과천' },
  { region: '원문동', city: '과천' },
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
  console.log(options);
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
