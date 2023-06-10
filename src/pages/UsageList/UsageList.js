import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WaitList from './WaitList';

function UsageList() {
  const [waitList, setWaitList] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/reservation/user/show-reservations', { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setWaitList(res.data.result.waitReservations);
      });
  }, []);
  // const usageHistory = [
  //   {
  //     id: 1,
  //     state: 'wait',
  //     dog_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulquOahMvWbXSqv2Bloml0ol2miJWhsV1Rw&usqp=CAU',
  //     petsitter_name: '펫시터1',
  //     start_date: '2023-03-28',
  //     end_date: '2023-03-30',
  //     cost: 10000,
  //     address: '경기도 팔달구 아주대',
  //     options: [
  //       {
  //         name: '산책',
  //         price: '1000',
  //       },
  //       {
  //         name: '미용',
  //         price: '1500',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     state: 'done',
  //     dog_img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRulquOahMvWbXSqv2Bloml0ol2miJWhsV1Rw&usqp=CAU',
  //     petsitter_name: '펫시터2',
  //     start_date: '2023-03-29',
  //     end_date: '2023-03-31',
  //     cost: 20000,
  //     address: '경기도 팔달구 아주대',
  //     options: [
  //       {
  //         name: '산책',
  //         price: '1000',
  //       },
  //       {
  //         name: '미용',
  //         price: '1500',
  //       },
  //     ],
  //   },
  // ];

  return (
    <div style={{
      width: '600px', margin: '30px auto 0px auto', display: 'flex', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <div>반려인 이용내역 페이지</div>
      <WaitList waitList={waitList} />
    </div>
  );
}

export default UsageList;
