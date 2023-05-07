import React, { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://withpet.site/api/v1/users/my-info';

function ViewProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // 받아온 회원 정보를 state에 저장한다.
        setUserInfo(response.data.result);
      })
      .catch(() => {
      });
  }, []); // 두 번째 인자에 빈 배열을 전달하여, 처음 한 번만 호출되도록 한다.

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{userInfo.name}</p>
          <p>전화번호: {userInfo.phoneNum}</p>
          <p>이메일: {userInfo.userEmail}</p>
          <p>우편번호: {userInfo.address.zipcode}</p>
          <p>도로명주소/상세주소 {userInfo.address.streetAdr} {userInfo.address.detailAdr}</p>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}

export default ViewProfile;
