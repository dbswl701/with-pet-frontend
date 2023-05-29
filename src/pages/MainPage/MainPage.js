import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
import PetSize from './PetSize';
import {
  Background, Content, SelectContainer, CardContainer,
} from '../../styles/main/MainPageStyle';

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
    <Background>
      <Content>
        <SelectContainer>
          <PetSize />
          <MultipleSelectChip />
          <RenderGroup />
        </SelectContainer>
        <CardContainer className="petsitterlist">
          <MediaCardGrid cards={temp} />
        </CardContainer>
      </Content>
    </Background>
  );
}

export default MainPage;
