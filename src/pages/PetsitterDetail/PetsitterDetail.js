import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams, useSearchParams } from 'react-router-dom';
import Content from './Content';
import Reservation from './Reservation';
import paymentIconYellowMedium from '../../assets/paymentIconYellowMedium.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HouseImgWrapper = styled.div`
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
  const searchParams = useSearchParams()[0];
  const pgToken = searchParams.get('pg_token'); // 2
  const [popup, setPopup] = useState('false');
  const [kakaoPay, setKakaoPay] = useState({ tid: '', pg_token: '' });
  const [initPgToken] = useState(localStorage.getItem('pg_token'));

  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [dogList, setDogList] = useState([]);
  const [houseImg, setHouseImg] = useState();
  const [open, setOpen] = useState(false); // 모달창
  const [payInfo, setPayInfo] = useState([]);
  const [ready, setReady] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const width = 600;
  const height = 800;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  useEffect(() => {
    if (pgToken !== null) {
      setPopup('complete');
      localStorage.setItem('pg_token', searchParams.get('pg_token'));
      window.close();
    }
    axios.get(`https://withpet.site/api/v1/petsitter/${id}`, { withCredentials: true })
      .then((res) => {
        setInfo(res.data.result);
        setHouseImg(res.data.result.petSitterHouses.find((item) => item.representative === true).houseImg);
      });
    axios.get(`https://withpet.site/api/v1/dogs/reservation-dogs?petSitterId=${id}`, { withCredentials: true })
      .then((res) => {
        setDogList(res.data.result);
      });
  }, []);

  const onPaying = (reservationId) => {
    // 카카오페이 api
    axios.post('https://withpet.site/payment/ready', { reservationId }, { withCredentials: true })
      .then((res) => {
        setPopup(window.open(
          res.data.result.next_redirect_pc_url,
          '카카오페이 결제',
          `width=${width},height=${height},left=${left},top=${top}`,
        ));
        console.log(res.data.result.tid);
        setKakaoPay({ ...kakaoPay, tid: res.data.result.tid });
      });
  };

  useEffect(() => {
    if (popup === 'false') {
      return;
    }
    let timer = null; // 타이머 변수를 선언하고 null로 초기화합니다.

    timer = setInterval(() => {
      const pgToken2 = localStorage.getItem('pg_token');

      if (pgToken2 !== initPgToken) {
        console.log('timer complete2');
        timer = clearInterval(timer);
        setKakaoPay({ ...kakaoPay, pg_token: pgToken2 });
        setReady(true);
      }
    }, 500);
  }, [popup]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    axios.get(`https://withpet.site/payment/success?pg_token=${kakaoPay.pg_token}&tid=${kakaoPay.tid}`, { withCredentials: true })
      .then(() => {
        setIsSuccess(true);
        // eslint-disable-next-line no-alert
        alert('예약이 완료되었습니다.');
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('카카오페이 결제에 실패했습니다.');
      });
  }, [ready, kakaoPay]);

  const showSuccess = (
    <div style={{
      height: '300px', display: 'flex', flexDirection: 'column', alignTtems: 'center', marginTop: '30%', textAlign: 'center',
    }}
    >
      <div>
        <img src="https://withpetoriginimage.s3.ap-northeast-1.amazonaws.com/3c4c2c20-fed4-45eb-98ab-de0f677693cc.png" alt="성공 아이콘" />
      </div>
      <div>
        <h3>결제에 성공하였습니다.</h3>
      </div>
      <Button type="button" onClick={() => setOpen(false)}>
        닫기
      </Button>
    </div>
  );

  const showPay = (
    <>
      <p> 결제창 </p>
      <p>체크인 : {payInfo.checkIn}</p>
      <p>체크아웃 : {payInfo.checkOut}</p>
      <p>반려견 크기(가격) : {payInfo.dogSize}({payInfo.criticalServicePrice})</p>
      <p>반겨련 이름 : {payInfo.dogName}</p>
      <p>펫시터 이름 : {payInfo.petSitterName}</p>
      <p>예약한 시간 : {payInfo.reservationDate}</p>
      <p>서비스</p>
      { payInfo.reservationServiceResponses && payInfo.reservationServiceResponses.map((service) => (
        <div key={service.serviceName}>
          <p>{service.serviceName}: {service.price}</p>
        </div>
      ))}
      <button style={{ backgroundColor: 'transparent', border: 'none' }}>
        <img src={paymentIconYellowMedium} alt="대체 텍스트" onClick={() => onPaying(payInfo.reservationId)} />
      </button>
      <input type="button" onClick={() => setOpen(false)} value="닫기" />
    </>
  );

  return (
    <>
      <Container>
        <HouseImgWrapper>
          <img src={houseImg} alt="집사진" style={{ width: '1200px', height: '500px' }} />
          {/* {info.homeImg && info.homeImg.map((img) => <img src={img.url} alt="집사진" key={img.id} />)} */}
          {/* { info.petSitterHouses && info.petSitterHouses.find((item) => item.representative === true)} */}
        </HouseImgWrapper>
        <ContentWrapper>
          <Content data={info} petsitterUserId={info.petSitterUserId} />
          <Reservation data={info} dogList={dogList} petsitterId={id} setOpen={setOpen} setPayInfo={setPayInfo} />
        </ContentWrapper>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
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
            { !isSuccess ? showPay : showSuccess }
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default PetsitterDetial;
