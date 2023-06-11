import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MultipleSelectChip from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
import PetSize from './PetSize';
import {
  Background, Content, SelectContainer,
} from '../../styles/main/MainPageStyle';

const Button = styled.button`
  border: none;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  background: white;
  color: gray;
  font-size: 1rem;

  &:hover {
    color: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

const NumButton = styled.div`
  border: 1px solid gray;
  border-radius: 50%;
  padding: 8px;
  margin: 0;
  background: white;
  color: gray;
  font-size: 1rem;

  &:hover {
    background-color: #CAA969;
    cursor: pointer;
    transform: translateY(-2px);
  }
`;

function MainPage() {
  const [temp, setTemp] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [options, setOptions] = useState({
    size: '',
    services: [],
    region: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
      .then((res) => {
        setServiceList(res.data.result);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ''}&page=${currentPage}`, { withCredentials: true })
      .then((res) => {
        setTemp(res.data.result);
      });
  }, [options, currentPage]);

  const handleClick = (page) => {
    setCurrentPage(page - 1);
  };

  const handlePrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage === temp.totalPages - 1) return;
    setCurrentPage((prev) => prev + 1);
  };

  const renderButtons = () => {
    const buttons = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= temp.totalPages; i++) {
      buttons.push(
        <NumButton key={i} onClick={() => handleClick(i)}>
          <button style={{ border: 'none', backgroundColor: 'transparent' }}>{i}</button>
        </NumButton>,
      );
    }
    return buttons;
  };

  return (
    <Background>
      <Content>
        <SelectContainer>
          <PetSize setOptions={setOptions} options={options} />
          <MultipleSelectChip services={serviceList} setOptions={setOptions} options={options} />
          <RenderGroup setOptions={setOptions} options={options} />
        </SelectContainer>
        <MediaCardGrid cards={temp.content} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={handlePrevious}> &lt; </Button>
          {renderButtons()}
          <Button onClick={handleNext}> &gt; </Button>
        </div>
      </Content>
    </Background>
  );
}

export default MainPage;
