import React from 'react';
import axios from 'axios';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Chip from '@mui/material/Chip';
import styled from 'styled-components';
import dogBanner from '../../assets/dog_banner.png';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
import house1 from '../../assets/house1.png';
import house2 from '../../assets/house2.png';
import house3 from '../../assets/house3.png';
import house4 from '../../assets/house4.png';
import house5 from '../../assets/house5.png';
import PetSize from './PetSize';

const BannerBox = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
width: 100%;
height: auto;
position: relative;
`;
const SelectBox = styled.div`
display: flex;
background-color: #ffffff;
width: 70%;
height: 122px;
margin: 0 auto;
justify-content: center;
align-items: center;
padding: 24px 30px;
gap: 20px;
position: relative;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
border-radius: 5px;
top: -50px
`;

axios({
  method: 'get',
  url: 'https://4a595605-a86b-482c-96a1-0196009f4a0e.mock.pstmn.io//api/v1/show-petsitter',
  responseType: 'json',
})
  .then(() => {
    // console.log(response);
  });

const petSitterList = [
  {
    id: 1,
    house: house1,
    name: '한놈',
    rate: 4.5,
  },
  {
    id: 2,
    house: house2,
    name: '두식이',
    rate: 3.5,
  },
  {
    id: 3,
    house: house3,
    name: '석삼',
    rate: 4.0,
  },
  {
    id: 4,
    house: house4,
    name: '너구리',
    rate: 2.5,
  },
  {
    id: 5,
    house: house5,
    name: '오징어',
    rate: 5.5,
  },
  {
    id: 6,
    house: house1,
    name: '한놈',
    rate: 4.5,
  },
  {
    id: 7,
    house: house2,
    name: '두식이',
    rate: 3.5,
  },
  {
    id: 8,
    house: house3,
    name: '석삼',
    rate: 4.0,
  },
  {
    id: 9,
    house: house4,
    name: '너구리',
    rate: 2.5,
  },
  {
    id: 10,
    house: house5,
    name: '오징어',
    rate: 5.5,
  },
];

function MainPage() {
  return (
    <>
      <div className="img">
        <BannerBox>
          <img src={dogBanner} alt="dog_banner" />
        </BannerBox>
      </div>
      <SelectBox>
        <div className="petsize" />
        <PetSize />
        <div className="optionlist" />
        <MultipleSelectChip />
        <div className="region" />
        <RenderGroup />
      </SelectBox>
      <div className="petsitterlist">
        <MediaCardGrid cards={petSitterList} />
      </div>
    </>
  );
}

export default MainPage;
