import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pay() {
  const [state, setState] = useState({
    next_redirect_pc_url: '',
    tid: '',
    params: {
      cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: '초코파이',
      quantity: 1,
      total_amount: 2200,
      vat_amount: 200,
      tax_free_amount: 0,
      // router에 지정한 PayResult의 경로로 수정
      approval_url: 'http://localhost:3000/payresult',
      fail_url: 'http://localhost:3000/payresult',
      cancel_url: 'http://localhost:3000/payresult',
    },
  });

  useEffect(() => {
    const { params } = state;
    axios({
      url: 'https://kapi.kakao.com/v1/payment/ready',
      method: 'POST',
      headers: {
        Authorization: 'KakaoAK de0e3076b485b703b1f1a4a2419440e6',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params,
    })
      .then((response) => {
        // const {
        //   data: { next_redirect_pc_url, tid },
        // } = response;

        // console.log(next_redirect_pc_url);
        // console.log(tid);
        // // localstorage에 tid 저장
        // window.localStorage.setItem('tid', tid);
        setState('');
        console.log(response.data);
      });
  }, []);
  return (
    <>

    </>
  );
}

export default Pay;
