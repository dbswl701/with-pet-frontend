import React, { useEffect, useState } from 'react';
import axios from 'axios';

const username = 'myusername'; // username 변수가 myusername 값으로 설정됐을 경우 (임의로 설정)
const url = 'http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/my-info';

function ViewProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        // 받아온 회원 정보를 state에 저장한다.
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log("viewprofile error");
      });
  }, []); // 두 번째 인자에 빈 배열을 전달하여, 처음 한 번만 호출되도록 한다.

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{userInfo.name}</p>
          <p>전화번호: {userInfo.phone}</p>
          <p>이메일: {userInfo.email}</p>
          <p>우편번호: {userInfo.zipcode}</p>
          <p>도로명주소/상세주소 {userInfo.streetAdr} {userInfo.detailAdr}</p>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}

export default ViewProfile;
