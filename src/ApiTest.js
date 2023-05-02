import React, { useState } from 'react';
import axios from 'axios';

function Apitest() {
  const [data, setData] = useState(null);

  const onClick = () => {
    setData('로딩중');
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function (res) {
        setData(JSON.stringify(res.data));
      })
      .catch(function (err) {
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
