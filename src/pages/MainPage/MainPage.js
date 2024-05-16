import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import OptionList from './OptionList';
import RenderGroup from './Region';
import MediaCardGrid from './MediaCardGrid';
import CheckDate from './CheckDate';
import PetSize from './PetSize';
import {
  Background, Content, SelectContainer,
} from '../../styles/main/MainPageStyle';
import baseUrl from '../../services/api';
// const baseUrl = 'https://withpet.site/api/v1/';
// const baseUrl = 'http://ec2-13-125-250-89.ap-northeast-2.compute.amazonaws.com:8080/'
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
  // const baseUrl = ''https://withpet.site';

  const [temp, setTemp] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [options, setOptions] = useState({
    size: [],
    services: [],
    region: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    // axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true })
    //   .then((res) => {
    //     console.log('show-services:', res);
    //     setServiceList(res.data.result);
    //   });
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://withpet.site/api/v1/show-services', { withCredentials: true });
        const response = await axios.get(`${baseUrl}/v1/show-services`, { withCredentials: true });
        console.log('show-services:', response);
        setServiceList(response.data.result);
      } catch (error) {
        console.error('Error fetching show-services:', error);
        // 에러 처리 로직 추가
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // axios.get(`https://withpet.site/api/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ''}&page=${currentPage}`, { withCredentials: true })
    //   .then((res) => {
    //     console.log('show-pesitter:', res);
    //     setTemp(res.data.result);
    //   });
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ''}&page=${currentPage}`, { withCredentials: true });
        console.log('show-pesitter:', response);
        setTemp(response.data.result);
      } catch (error) {
        console.error('Error fetching show-pesitter:', error);
        // 에러 처리 로직 추가
      }
    };

    fetchData();
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

  const onClick = () => {
    axios.get(`${baseUrl}/v1/show-petsitter?address=${options.region}&dogSize=${options.size}&service=${options.services !== undefined ? options.services : ''}&page=${currentPage}`, { withCredentials: true })
      .then((res) => {
        setTemp(res.data.result);
      });
  };

  return (
    <Background>
      <Content>
        <SelectContainer>
          <div style={{
            display: 'flex', flexDirection: 'row', width: '1200px',
          }}
          >
            <PetSize setOptions={setOptions} options={options} />
            <CheckDate setOptions={setOptions} options={options} />
            <OptionList services={serviceList} setOptions={setOptions} options={options} />
            <RenderGroup setOptions={setOptions} options={options} />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
            <SearchIcon fontSize="large" onClick={onClick} />
          </div>
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
