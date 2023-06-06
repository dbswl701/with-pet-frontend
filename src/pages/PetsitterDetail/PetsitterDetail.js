import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useParams, useSearchParams } from 'react-router-dom';
import Content from './Content';
import Reservation from './Reservation';
import paymentIconYellowMedium from '../../assets/paymentIconYellowMedium.png';

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
  // const navigate = useNavigate();
  // const location = useLocation();
  // const queryString = location.search;
  // const [searchParams, setSearchParams] = useSearchParams();
  const searchParams = useSearchParams()[0];
  const pgToken = searchParams.get('pg_token'); // 2
  const [popup, setPopup] = useState('false');
  const [kakaoPay, setKakaoPay] = useState({ tid: '', pg_token: '' });
  const [initPgToken] = useState(localStorage.getItem('pg_token'));

  const { id } = useParams();
  // console.log(id);
  const [info, setInfo] = useState({});
  const [dogList, setDogList] = useState([]);
  // const [info2, setInfo2] = useState({});
  const [houseImg, setHouseImg] = useState();
  const [open, setOpen] = useState(false); // 모달창
  const [payInfo, setPayInfo] = useState([]);
  // const [paymentInfo, setpaymentInfo] = useState({});
  const [ready, setReady] = useState(false);

  const width = 600;
  const height = 800;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  useEffect(() => {
    // console.log(pgToken);
    // console.log(kakaoPay);
    if (pgToken !== null) {
      // console.log('close');
      setPopup('close');
      localStorage.setItem('pg_token', searchParams.get('pg_token'));
      // window.close();

      axios.get('http://ec2-13-209-73-128.ap-northeast-2.compute.amazonaws.com:8080/payment/cancel', { withCredentials: true })
        .then(() => {
          // console.log(res);
        });
    }
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

  const onPaying = (reservationId) => {
    // console.log(reservationId);
    const temp = {
      reservationId,
    };
    // 카카오페이 api
    axios.post('https://withpet.site/payment/ready', temp, { withCredentials: true })
      .then((res) => {
        let popupTemp = null;
        if (res.data.resultCode) {
          popupTemp = window.open(
            res.data.result.next_redirect_pc_url,
            '카카오페이 결제',
            `width=${width},height=${height},left=${left},top=${top}`,
          );
          setPopup(popupTemp);
          setKakaoPay({ ...kakaoPay, tid: res.data.result.tid });
        // eslint-disable-next-line no-alert
        } else alert('카카오페이 결제 시도에 실패했습니다.');

        // console.log(res.data.result);
        // setpaymentInfo(res.data.result);
        // console.log(res.data.result.next_redirect_pc_url);

        // navigate(`${res.data.result.next_redirect_pc_url}`);
      });
  };
  // console.log(paymentInfo);
  // console.log(pgToken);
  // console.log(popup);

  useEffect(() => {
    if (popup === 'false') {
      return;
    }
    let timer = null; // 타이머 변수를 선언하고 null로 초기화합니다.

    timer = setInterval(() => {
      // console.log('timer');
      // console.log(popup);
      if (popup === 'close') {
        // console.log('팝업창 종료');
        timer = clearInterval(timer);
        return;
      }
      const pgToken2 = localStorage.getItem('pg_token');
      // console.log(pgToken2);
      // console.log(initPgToken);
      if (pgToken2 !== initPgToken) {
        // console.log('달라서 종료');
        timer = clearInterval(timer);
        setKakaoPay({ ...kakaoPay, pg_token: pgToken2 });
        setReady(true);
      }
    }, 500);
  }, [popup, initPgToken]);

  // console.log(kakaoPay);

  useEffect(() => {
    if (!ready) {
      return;
    }
    // console.log(kakaoPay.pg_token);
    // console.log(kakaoPay.tid);

    axios.get(`https://withpet.site/payment/success?pg_token=${kakaoPay.pg_token}&tid=${kakaoPay.tid}`, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('예약이 완료되었습니다.');
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('카카오페이 결제에 실패했습니다.');
      });
  }, [ready, kakaoPay]);

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
          {/* <Reservation data={info} dogList={dogList} petsitterId={id} /> */}
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
            { showPay }
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default PetsitterDetial;
