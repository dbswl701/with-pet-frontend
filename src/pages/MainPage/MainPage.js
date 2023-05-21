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
import styled from 'styled-components';
import dogBanner from '../../assets/dog_banner.png';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
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

function MainPage() {
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-petsitter', { withCredentials: true })
      .then((res) => {
        setTemp(res.data.result.content);
        // console.log(res.data.result.content);
        // console.log(temp);
      });
  }, []);
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
        <MediaCardGrid cards={temp} />
      </div>
    </>
  );
}

export default MainPage;
