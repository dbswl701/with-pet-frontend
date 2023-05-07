import axios from 'axios';
import React, { useState } from 'react';

function ApiTest() {
  const [userName, setUserName] = useState(' ## 이름 ##');
  const onClick = () => {
    axios.get('https://withpet.site/api/v1/users/my-info')
      .then((res) => {
        setUserName(res.data.result.userName);
      })
      .catch(() => {
        setUserName('에러');
      });
  };

  return (
    <>
      <button onClick={onClick} />
      {userName}
    </>
  );
}

export default ApiTest;
