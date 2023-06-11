import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import WaitList from './WaitList';

function UsageList() {
  const [waitList, setWaitList] = useState([]);
  const [payedList, setPayedList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [useList, setUseList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [popup, setPopup] = useState('false');
  const [kakaoPay, setKakaoPay] = useState({ tid: '', pg_token: '' });
  const searchParams = useSearchParams()[0];
  const pgToken = searchParams.get('pg_token');
  const [ready, setReady] = useState(false);
  const [initPgToken] = useState(localStorage.getItem('pg_token'));
  const [saveReservationId, setSaveReservationId] = useState('');

  const handleCancel = (reservationId) => {
    axios.post('https://withpet.site/api/v1/reservation/user/cancel-reservation', { reservationId }, { withCredentials: true })
      .then(() => {
        setWaitList(waitList.filter((item) => (item.reservationId !== reservationId)));
      });
  };

  const handleWaitRefund = (reservationId) => {
    axios.post('https://withpet.site/payment/refund', { reservationId }, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('예약이 취소되었습니다.');
        setPayedList(payedList.filter((item) => (item.reservationId !== reservationId)));
      });
  };

  const handleApproveRefund = (reservationId) => {
    axios.post('https://withpet.site/payment/refund', { reservationId }, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('예약이 취소되었습니다.');
        setApproveList(approveList.filter((item) => (item.reservationId !== reservationId)));
      });
  };

  const handleReview = (reservationId, reviewContent) => {
    const temp = {
      content: reviewContent.content,
      grade: reviewContent.rate,
      reservationId,
    };
    axios.post('https://withpet.site/api/v1/review/create-review', temp, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('리뷰 작성이 완료되었습니다.');
      });
  };

  const handleDone = (reservationId) => {
    axios.post('https://withpet.site/api/v1/reservation/user/done-reservation', { reservationId }, { withCredentials: true })
      .then(() => {
        setUseList(useList.filter((item) => (item.reservationId !== reservationId)));
        const select = useList.filter((item) => (item.reservationId === reservationId));
        setDoneList(doneList.concat(select));
      });
  };

  useEffect(() => {
    if (pgToken !== null) {
      setPopup('complete');
      localStorage.setItem('pg_token', searchParams.get('pg_token'));
      window.close();
    }
    axios.get('https://withpet.site/api/v1/reservation/user/show-reservations', { withCredentials: true })
      .then((res) => {
        setWaitList(res.data.result.waitReservations);
        setPayedList(res.data.result.payedReservations);
        setApproveList(res.data.result.approveReservations);
        setUseList(res.data.result.useReservations);
        setDoneList(res.data.result.doneReservations);
      });
  }, []);

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
        // eslint-disable-next-line no-alert
        alert('예약이 완료되었습니다.');
        // 결제 대기에서 예약 대기로 이동
        setWaitList(waitList.filter((item) => (item.reservationId !== saveReservationId)));
        const select = waitList.filter((item) => (item.reservationId === saveReservationId));
        setPayedList(payedList.concat(select));
      })
      .catch(() => {
        // eslint-disable-next-line no-alert
        alert('카카오페이 결제에 실패했습니다.');
      });
  }, [ready, kakaoPay]);

  const width = 600;
  const height = 800;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;

  const onPaying = (reservationId) => {
    // 카카오페이 api
    axios.post('https://withpet.site/payment/ready', { reservationId }, { withCredentials: true })
      .then((res) => {
        setPopup(window.open(
          res.data.result.next_redirect_pc_url,
          '카카오페이 결제',
          `width=${width},height=${height},left=${left},top=${top}`,
        ));
        setKakaoPay({ ...kakaoPay, tid: res.data.result.tid });
        setSaveReservationId(reservationId);
      });
  };

  return (
    <div style={{
      width: '600px', margin: '30px auto 0px auto', display: 'flex', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <div style={{ margin: '0px auto' }}>
        <p style={{ fontSize: '30px', fontWeight: 'bold' }}>이용 내역</p>
      </div>
      <WaitList list={waitList} handleCancel={handleCancel} stepValue="1" onPaying={onPaying} />
      <WaitList list={payedList} handleCancel={handleWaitRefund} stepValue="2" />
      <WaitList list={approveList} handleCancel={handleApproveRefund} stepValue="3" />
      <WaitList list={useList} handleCancel={handleCancel} stepValue="4" handleDone={handleDone} />
      <WaitList list={doneList} handleCancel={handleCancel} stepValue="5" handleReview={handleReview} />
    </div>
  );
}

export default UsageList;
