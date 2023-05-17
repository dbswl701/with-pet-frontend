import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Chip from '@mui/material/Chip';
// import styled from 'styled-components';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
// import house1 from '../../assets/house1.png';
// import house2 from '../../assets/house2.png';
// import house3 from '../../assets/house3.png';
// import house4 from '../../assets/house4.png';
// import house5 from '../../assets/house5.png';
import PetSize from './PetSize';
import {
  Background, Content, SelectContainer,
} from './MainPageStyle';
// import dogBanner from '../../assets/dog_banner.png';

// const BannerBox = styled.div`
// display: flex;
// flex-wrap: wrap;
// justify-content: center;
// width: 100%;
// height: auto;
// position: relative;
// `;
// const SelectBox = styled.div`
// display: flex;
// background-color: #ffffff;
// width: 70%;
// height: 122px;
// margin: 0 auto;
// justify-content: center;
// align-items: center;
// padding: 24px 30px;
// gap: 20px;
// position: relative;
// box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
// border-radius: 5px;
// top: -50px
// `;

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

function MainPage() {
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-petsitter', { withCredentials: true })
      .then((res) => {
        setTemp(res.data.result.content);
        console.log(res.data.result.content);
        console.log(temp);
      });
  }, []);
  return (
    <Background>
      {/* <img id="dog" src={dogBanner} alt="dog" /> */}
      <Content>
        <SelectContainer>
          <PetSize />
          <MultipleSelectChip />
          <RenderGroup />
        </SelectContainer>
        {/* <div> */}
        <MediaCardGrid temp={temp} />
        {/* </div> */}
      </Content>
    </Background>
  );
}

export default MainPage;
