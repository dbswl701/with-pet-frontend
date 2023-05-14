import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Content from './Content';
import Reservation from './Reservation';

const Container = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
`;

const HouseImgWrapper = styled.div`
  background-color: yellow;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direciton: row;
  background-color: red;
  height: 100%;
  margin: 70px auto 0px auto;
  width: 1027px;
  justify-content: space-between;
`;

function PetsitterDetial() {
  const [info, setInfo] = useState({});
  const [info2, setInfo2] = useState({});

  useEffect(() => {
    axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/petsitterDetail/1')
      .then((res) => {
        // console.log(res.data.result);
        setInfo(res.data.result);
      })
      .catch(() => {
      });
    axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/petsitte_user/1')
      .then((res) => {
        // console.log(res.data.result);
        setInfo2(res.data.result);
      })
      .catch(() => {
      });
  }, []);
  return (
    <>
      <Container>
        <HouseImgWrapper>
          {info.homeImg && info.homeImg.map((img) => <img src={img.url} alt="집사진" key={img.id} />)}
        </HouseImgWrapper>
        <ContentWrapper>
          <Content data={info} />
          <Reservation data={info2} sizeFee={info.sizeFee} />
        </ContentWrapper>
      </Container>
    </>
  );
}

export default PetsitterDetial;
