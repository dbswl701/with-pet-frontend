import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import dogimgdefault from '../../assets/dogProfileImage.png';

const url = 'https://withpet.site/api/v1/users/my-info';
function UsageList() {
  const [usageHistory, setUsageHistory] = useState([]);
  // const [petImg, setPetImg] = useState({
  //   dog_img: '',
  // });

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setUsageHistory(response.data.result);
        // setPetImg(response.data.result.dog_img);
      })
      .catch(() => {
      });
  }, []);

  return (
    <>
      <div>
        <p>{usageHistory.petsitterName}</p>
        <p>기간: {usageHistory.startDate} {usageHistory.endDate}</p>
        <p>비용: {usageHistory.totalCost}</p>
        <p>주소: {usageHistory.address.streetAdr} {usageHistory.address.detailAdr} </p>
        <p>옵션: {usageHistory.petsitterOption}</p>
      </div>  
      <div>반려인 이용내역 페이지</div>
    </>
  );
}

export default UsageList;
