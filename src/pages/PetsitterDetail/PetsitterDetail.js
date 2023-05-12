import React from 'react';
import styled from 'styled-components';
import house from '../../assets/house.png';
import Profile from './ProfileCard';
import PetsitterInfo from './PetsitterInfo';
import DatePick from './DatePick';
import Intro from './PetsitterInfo.json';
import TimePick from './TimePick';
import PetList from './PetList';
import Review from './Reviews';

const ReserveWrapper = styled.div`
  position: relative;
  display: inline-block;
  float: right;
  width: 30%;
  margin-top: -40%;
`;

const Content = styled.div`
  text-align: left;
`;

const ContentsWrapper = styled.div`
  position: relative;
  text-align: center;
  justify-content: center;
  margin: auto;
  width: 70%;
`;
// const Contents = styled.div`

// `;
const HouseWrapper = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  height: 0;
  padding: 0 0 100% 0;
  margin-bottom: 0%;
  overflow: hidden;
`;
const HouseImg = styled.img`
  position: relative;
  width: 100%;
  margin: auto;
  object-fit: cover;
  background-size: cover;
`;

function Introduce() {
  return (
          <div>
              <h3>소개글</h3>
              <p>
                  {Intro.info}
              </p>
          </div>
  );
}

function PetsitterDetial() {
  return (
    <ContentsWrapper>
    <HouseWrapper>
      <HouseImg src={house} alt="house" />
    </HouseWrapper>
    <Content>
      <Profile />
      <Introduce />
      <Review />
    </Content>
    <ReserveWrapper>
      <DatePick />
      <TimePick />
      <PetList />
      <PetsitterInfo />
    </ReserveWrapper>
    </ContentsWrapper>
  );
}

export default PetsitterDetial;
