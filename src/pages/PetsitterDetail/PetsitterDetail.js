import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams();
  console.log(id);
  const [info, setInfo] = useState({});
  const [dogList, setDogList] = useState([]);
  // const [info2, setInfo2] = useState({});
  const [houseImg, setHouseImg] = useState();

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/petsitter/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setInfo(res.data.result);
        setHouseImg(res.data.result.petSitterHouses.find((item) => item.representative === true).houseImg);
      })
      .catch(() => {
      });
    axios.get(`https://withpet.site/api/v1/dogs/reservation-dogs?petSitterId=${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setDogList(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  return (
    <>
      <Container>
        <HouseImgWrapper>
          <img src={houseImg} alt="집사진" />
          {/* {info.homeImg && info.homeImg.map((img) => <img src={img.url} alt="집사진" key={img.id} />)} */}
          {/* { info.petSitterHouses && info.petSitterHouses.find((item) => item.representative === true)} */}
        </HouseImgWrapper>
        <ContentWrapper>
          <Content data={info} />
          <Reservation data={info} dogList={dogList} petsitterId={id} />
        </ContentWrapper>
      </Container>
    </>
  );
}

export default PetsitterDetial;
