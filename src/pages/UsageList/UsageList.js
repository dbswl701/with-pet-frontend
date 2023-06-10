import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WaitList from './WaitList';

function UsageList() {
  const [waitList, setWaitList] = useState([]);
  const [payedList, setPayedList] = useState([]);
  const [approveList, setApproveList] = useState([]);
  const [useList, setUseList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const handleCancel = (reservationId) => {
    axios.post(`https://withpet.site/api/v1/reservation/user/cancel-reservation?reservationId=${reservationId}`, { withCredentials: true })
      .then(() => {
        // 목록에서도 삭제
        setWaitList(waitList.filter((item) => (item.reservationId !== reservationId)));
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
    axios.post(`https://withpet.site/api/v1/reservation/user/done-reservation?reservationId=${reservationId}`, { withCredentials: true })
      .then((res) => {
        // 목록에서도 삭제
        setUseList(useList.filter((item) => (item.reservationId !== reservationId)));
        setDoneList(doneList.concat(res.data.result));
      });
  };

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/reservation/user/show-reservations', { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setWaitList(res.data.result.waitReservations);
        setPayedList(res.data.result.payedReservations);
        setApproveList(res.data.result.approveReservations);
        setUseList(res.data.result.useReservations);
        setDoneList(res.data.result.doneReservations);
      });
  }, []);

  return (
    <div style={{
      width: '600px', margin: '30px auto 0px auto', display: 'flex', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <div>반려인 이용내역 페이지</div>
      <WaitList list={waitList} handleCancel={handleCancel} stepValue="1" />
      <WaitList list={payedList} handleCancel={handleCancel} stepValue="2" />
      <WaitList list={approveList} handleCancel={handleCancel} stepValue="3" />
      <WaitList list={useList} handleCancel={handleCancel} stepValue="4" handleDone={handleDone} />
      <WaitList list={doneList} handleCancel={handleCancel} stepValue="5" handleReview={handleReview} />
    </div>
  );
}

export default UsageList;
