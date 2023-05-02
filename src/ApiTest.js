import React, { useState } from 'react';
import axios from 'axios';

function Apitest() {
  const [data, setData] = useState(null);

  const onClick = () => {
    setData('로딩중');
    axios.get('http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/hello')
      .then((res) => {
        setData(JSON.stringify(res.data));
      })
      .catch((err) => {
        setData('에러', err);
      });
  };

  return (
    <>
      <button onClick={onClick}>불러오기</button>
      <p>{data}</p>
    </>
  );
}

export default Apitest;
