import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import dogBanner from '../../assets/dog_banner.png';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
// import house1 from '../../assets/house1.png';
// import house2 from '../../assets/house2.png';
// import house3 from '../../assets/house3.png';
// import house4 from '../../assets/house4.png';
// import house5 from '../../assets/house5.png';

const url = 'https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/show-petsitter';

function getData() {
  const [petSitterList, setPetSitterList] = useState([]);
  petSitterList.defaultProps = {
    petSitterList: [],
  };

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setPetSitterList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <MediaCardGrid petSitterList={petSitterList} />
    </div>
  );
}

const BannerBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
const SelectBox = styled.div`
  display: flex;
  background-color: #ffffff;
  width: 80%;
  height: 122px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 24px 30px;
  gap: 20px;
  position: relative;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
`;
const pet = [
  '초코', '보리', '바보',
];

// const petSitterList = [
//   {
//     id: 1,
//     house: house1,
//     name: '한놈',
//     rate: 4.5,
//   },
//   {
//     id: 2,
//     house: house2,
//     name: '두식이',
//     rate: 3.5,
//   },
//   {
//     id: 3,
//     house: house3,
//     name: '석삼',
//     rate: 4.0,
//   },
//   {
//     id: 4,
//     house: house4,
//     name: '너구리',
//     rate: 2.5,
//   },
//   {
//     id: 5,
//     house: house5,
//     name: '오징어',
//     rate: 5.5,
//   },
//   {
//     id: 6,
//     house: house1,
//     name: '한놈',
//     rate: 4.5,
//   },
//   {
//     id: 7,
//     house: house2,
//     name: '두식이',
//     rate: 3.5,
//   },
//   {
//     id: 8,
//     house: house3,
//     name: '석삼',
//     rate: 4.0,
//   },
//   {
//     id: 9,
//     house: house4,
//     name: '너구리',
//     rate: 2.5,
//   },
//   {
//     id: 10,
//     house: house5,
//     name: '오징어',
//     rate: 5.5,
//   },
// ];

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

function getStyles(name, petName, theme) {
  return {
    fontWeight:
      petName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectPet() {
  const theme = useTheme();
  const [petName, setPetName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPetName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">반려견</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={petName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="반려견" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {pet.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, petName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function MainPage() {
  return (
    <>
      <div className="img">
      <BannerBox>
      <img src={dogBanner} alt="dog_banner" />
      </BannerBox>
      </div>
      <SelectBox>
        <div className="petlist" />
        <MultipleSelectPet />
        <div className="datepick">
          <input type="date" />
        </div>
        <div className="optionlist" />
        <MultipleSelectChip />
        <div className="region" />
        <RenderGroup />
      </SelectBox>
      <div className="petsitterlist">
        { getData() }
      </div>
    </>
  );
}

export default MainPage;
