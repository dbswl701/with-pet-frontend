import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useParams, useSearchParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
  height: 100%;
  margin: 70px auto 0px auto;
  width: 1027px;
  justify-content: space-between;
`;

function PetsitterDetial() {
  const searchParams = useSearchParams()[0];
  const pgToken = searchParams.get('pg_token');
  const [popup, setPopup] = useState('false');
  const [kakaoPay, setKakaoPay] = useState({ tid: '', pg_token: '' });
  const [initPgToken] = useState(localStorage.getItem('pg_token'));

  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [dogList, setDogList] = useState([]);
  const [houseImg, setHouseImg] = useState();
  const [open, setOpen] = useState(false);
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
    axios.post('https://withpet.site/payment/ready', { reservationId }, { withCredentials: true })
      .then((res) => {
        setPopup(window.open(
          res.data.result.next_redirect_pc_url,
          '카카오페이 결제',
          `width=${width},height=${height},left=${left},top=${top}`,
        ));
        setKakaoPay({ ...kakaoPay, tid: res.data.result.tid });
      });
  };

  useEffect(() => {
    if (popup === 'false') {
      return;
    }
    let timer = null;

    timer = setInterval(() => {
      const pgToken2 = localStorage.getItem('pg_token');

      if (pgToken2 !== initPgToken) {
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

  const showPayInfo = [
    {
      name: '예약 일자',
      desc: dayjs(payInfo.reservationDate).format('YYYY-MM-DD'),
    },
    {
      name: '체크인',
      desc: dayjs(payInfo.checkIn).format('YYYY-MM-DD (HH:mm)'),
    },
    {
      name: '체크아웃',
      desc: dayjs(payInfo.checkOut).format('YYYY-MM-DD (HH:mm)'),
    },
    {
      name: '펫시터 이름',
      desc: payInfo.petSitterName,
    },
    {
      name: '반려견 이름',
      desc: payInfo.dogName,
    },
    {
      name: '반려견 크기',
      desc: payInfo.dogSize,
    },
  ];

  const handleShowWarning = () => {
    // eslint-disable-next-line no-alert
    alert('해당 예약건은 이용내역에서 다시 결제를 진행할 수 있습니다. 1일 이내에 결제를 진행하지 않으면 자동으로 예약 취소됩니다.');
    setOpen(false);
  };

  const showPay = (
    <div style={{
      width: '435px', padding: '30px', display: 'flex', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <div style={{
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      }}
      >
        <p style={{ fontSize: '25px', color: '#CAA969', margin: '0px' }}>결제 및 예약정보 확인</p>
        <input
          type="button"
          style={{
            width: '28px', height: '28px', fontSize: '15px', color: '#CAA969', backgroundColor: '#E3D5C2', borderRadius: '5px', border: 'none', fontWeight: 'bold',
          }}
          onClick={handleShowWarning}
          value="×"
        />
      </div>
      <p style={{
        fontSize: '13px', marginTop: '0px', color: 'red',
      }}
      >* 1일 이내로 결제하지 않으면 해당 예약건은 자동으로 취소됩니다.
      </p>
      <List disablePadding>
        <div style={{ borderBottom: '1px solid gray' }}>
          {showPayInfo.map((product) => (
            <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={product.name} />
              <Typography variant="body2">{product.desc}</Typography>
            </ListItem>
          ))}
        </div>
        <div style={{ borderBottom: '1px solid gray' }}>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary={payInfo.criticalServiceName} />
            <Typography variant="body2">{payInfo.criticalServicePrice} 원</Typography>
          </ListItem>
          { payInfo.reservationServiceResponses && payInfo.reservationServiceResponses.map((service) => (
            <ListItem key={service.serviceName} sx={{ py: 1, px: 0 }}>
              <ListItemText primary={service.serviceName} />
              <Typography variant="body2">{service.price} 원</Typography>
            </ListItem>
          ))}
        </div>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            ₩ {payInfo.totalCost} 원
          </Typography>
        </ListItem>
      </List>
      <div style={{ margin: 'auto', marginTop: '20px' }}>
        <button style={{ backgroundColor: 'transparent', border: 'none' }}>
          <img src={paymentIconYellowMedium} alt="대체 텍스트" onClick={() => onPaying(payInfo.reservationId)} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Container>
        <HouseImgWrapper>
          <img src={houseImg} alt="집사진" style={{ width: '1200px', height: '500px' }} />
        </HouseImgWrapper>
        <ContentWrapper>
          <Content data={info} petsitterUserId={info.petSitterUserId} reviews={info.reviewResponses} />
          <Reservation data={info} dogList={dogList} petsitterId={id} setOpen={setOpen} setPayInfo={setPayInfo} />
        </ContentWrapper>
      </Container>
      <Modal open={open} onClose={() => setOpen(false)} style={{ margin: '40px' }}>
        <Box
          sx={{
            width: 500,
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
          { !isSuccess ? showPay : showSuccess }
        </Box>
      </Modal>
    </>
  );
}

export default PetsitterDetial;
