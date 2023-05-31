import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
import PetSize from './PetSize';
import {
  Background, Content, SelectContainer,
} from '../../styles/main/MainPageStyle';

function MainPage() {
  const [temp, setTemp] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [options, setOptions] = useState({
    size: '',
    services: [],
    region: '',
  });
  useEffect(() => {
    // axios.get('https://withpet.site/api/v1/show-petsitter?address=&dogSize=&service=', { withCredentials: true })
    //   .then((res) => {
    //     setTemp(res.data.result.content);
    //     // console.log(res.data.result.content);
    //     // console.log(temp);
    //   });
    axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
      .then((res) => {
        setServiceList(res.data.result);
      });
  }, []);

  useEffect(() => {
    // console.log(options);
    // console.log(options.services);
    // console.log(options.services[0]);

    axios.get(`https://withpet.site/api/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ''}`, { withCredentials: true })
      .then((res) => {
        setTemp(res.data.result.content);
        // console.log(res.data.result.content);
        // console.log(temp);
      });
  }, [options]);
  return (
    <Background>
      <Content>
        <SelectContainer>
          <PetSize setOptions={setOptions} options={options} />
          <MultipleSelectChip services={serviceList} setOptions={setOptions} options={options} />
          <RenderGroup setOptions={setOptions} options={options} />
        </SelectContainer>
        <MediaCardGrid cards={temp} />
      </Content>
    </Background>
  );
}

export default MainPage;
