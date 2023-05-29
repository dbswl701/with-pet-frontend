import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Content from './Content';
import Reservation from './Reservation';
// import paymentIconYellowMedium from '../../assets/paymentIconYellowMedium.png';

const Container = styled.div`
  // background-color: blue;
  display: flex;
  flex-direction: column;
`;

const HouseImgWrapper = styled.div`
  // background-color: yellow;
  text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direciton: row;
  // background-color: red;
  height: 100%;
  margin: 70px auto 0px auto;
  width: 1027px;
  justify-content: space-between;
`;

function PetsitterDetial() {
  const { id } = useParams();
  // console.log(id);
  const [info, setInfo] = useState({});
  const [dogList, setDogList] = useState([]);
  // const [info2, setInfo2] = useState({});
  const [houseImg, setHouseImg] = useState();
  // const [open, setOpen] = useState(false); // 모달창
  // const [payInfo, setPayInfo] = useState([]);

  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/petsitter/${id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        setInfo(res.data.result);
        setHouseImg(res.data.result.petSitterHouses.find((item) => item.representative === true).houseImg);
      })
      .catch(() => {
      });
    axios.get(`https://withpet.site/api/v1/dogs/reservation-dogs?petSitterId=${id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
        setDogList(res.data.result);
      })
      .catch(() => {
      });
  }, []);

  // const onPaying = (reservationId) => {
  //   console.log(reservationId);
  //   const temp = {
  //     reservationId: 0,
  //   };
  //   // 카카오페이 api
  //   axios.post('https://withpet.site/payment/ready', temp, { withCredentials: true })
  //     .then((res) => {
  //       console.log(res.result);
  //     });
  // };

  // const showPay = (
  //   <>
  //     <p> 결제창 </p>
  //     <p>체크인 : {payInfo.checkIn}</p>
  //     <p>체크아웃 : {payInfo.checkOut}</p>
  //     <p>반려견 크기(가격) : {payInfo.dogSize}({payInfo.criticalServicePrice})</p>
  //     <p>반겨련 이름 : {payInfo.dogName}</p>
  //     <p>펫시터 이름 : {payInfo.petSitterName}</p>
  //     <p>예약한 시간 : {payInfo.reservationDate}</p>
  //     <button style={{ backgroundColor: 'transparent', border: 'none' }}>
  //       <img src={paymentIconYellowMedium} alt="대체 텍스트" onClick={() => onPaying(payInfo.reservationId)} />
  //     </button>
  //     <input type="button" onClick={() => setOpen(false)} value="닫기" />
  //   </>
  // );

  return (
    <>
      <Container>
        <HouseImgWrapper>
          <img src={houseImg} alt="집사진" style={{ width: '1200px', height: '500px' }} />
          {/* {info.homeImg && info.homeImg.map((img) => <img src={img.url} alt="집사진" key={img.id} />)} */}
          {/* { info.petSitterHouses && info.petSitterHouses.find((item) => item.representative === true)} */}
        </HouseImgWrapper>
        <ContentWrapper>
          <Content data={info} />
          {/* <Reservation data={info} dogList={dogList} petsitterId={id} setOpen={setOpen} setPayInfo={setPayInfo} /> */}
          <Reservation data={info} dogList={dogList} petsitterId={id} />
        </ContentWrapper>
      </Container>
      {/* <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 800,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'top',
            alignItems: 'center',
            bgcolor: 'background.paper',
            boxShadow: 24,
            margin: 'auto',
            overflow: 'scroll',
            p: 2,
          }}
        >
          <div>
            { showPay }
          </div>
        </Box>
      </Modal> */}
    </>
  );
}

export default PetsitterDetial;
