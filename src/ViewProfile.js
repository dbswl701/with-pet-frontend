import React, { useEffect, useState } from 'react';
import axios from 'axios';

const username = 'myusername'; // username 변수가 myusername 값으로 설정됐을 경우 (임의로 설정)

axios.get(`http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users/${username}`)
  .then((response) => {
    // 응답 데이터 처리
    console.log(response.data);
  })
  .catch((error) => {
    // 에러 처리
    console.log(error);
  });

function ViewProfile() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // GET request를 보내서 서버로부터 회원 정보를 받아옵니다.
    axios.get('http://ec2-3-39-193-176.ap-northeast-2.compute.amazonaws.com:8080/api/v1/users')
      .then((response) => {
        // 받아온 회원 정보를 state에 저장합니다.
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {userInfo && (
        <div>
          <h2>{userInfo.userName}</h2>
          <p>전화번호: {userInfo.phoneNum}</p>
          <p>이메일: {userInfo.userEmail}</p>
          <p>주소: {userInfo.address.streetAdr} {userInfo.address.detailAdr}
            {userInfo.address.zipcode}
          </p>
        </div>
      )}
    </div>
  );
}

export default ViewProfile;
