import React, { useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, ProfileImg, IconImg, InfoContainer, ProfileContainer, EvalContainer, Button,
} from '../../styles/sidebar/SidebarStyle';

// const Progress = styled.div`
//   width: 148px;
//   height: 10px;
//   background-color: red;
//   border-radius: 5px;
//   margin: auto 10px;
// `;

// const Dealt = styled.div`
//   background-color: yellow;
//   width: ${(props) => `${props.dealt}%`};
//   height: 100%;
//   border-radius: 5px;
// `;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   border-radius:10px;
//   margin: 20px 0px;
// `;

function CurrentListItem({ item, handleRemoveNew, handleApprove }) {
  // console.log(item);
  const [showDiv, setShowDiv] = useState(false);

  const onClick = (e) => {
    const reservationStatus = {
      reservationId: item.reservationId,
      status: e.target.value,
    };
    // console.log(reservationStatus);
    axios.put('https://withpet.site/api/v1/reservation/reservation-status', reservationStatus, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        // 이제 어쨌든 newlist에서 삭제하고, 승인이면 이용자 목록으로 올림!
        // 일단 삭제
        // console.log(res.data.result);
        // console.log(item);
        // setNewReservations(item.filter((temp) => (temp.reservationId !== res.data.result.reservationId)));
        handleRemoveNew(res.data.result.reservationId);

        // 그리고 만약 승인이면 이용자목록에 붙여버린다.
        // 붙이는거 걍 함수로 전달
        if (e.target.value === 'APPROVAL') {
          handleApprove(res.data.result.reservationId, res.data.result);
        }
      });
  };

  const showButton = (
    <>
      <button>일지</button>
      <button>상세</button>
    </>
  );
  return (
    <>
      <ItemContainer onMouseEnter={() => setShowDiv(true)} onMouseLeave={() => setShowDiv(false)}>
        <ProfileContainer>
          <ProfileImg src={item.dogImg} alt="img" />
          <InfoContainer>
            <p className="info">
              {item.dogName} | {item.cost}
            </p>
            <p className="period">{item.checkIn} ~ {item.checkOut}</p>
          </InfoContainer>
        </ProfileContainer>
        <EvalContainer>
          <IconImg className="heart" src={heart} alt="heart" />
          <Progress>
            <Dealt className="heart" dealt={item.affectionTemperature} />
          </Progress>
          <p className="heart">{item.affectionTemperature}%</p>
        </EvalContainer>
        <EvalContainer>
          <IconImg className="social" src={social} alt="social" />
          <Progress>
            <Dealt className="social" dealt={item.socializationTemperature} />
          </Progress>
          <p className="social">{item.socializationTemperature}%</p>
        </EvalContainer>
        <EvalContainer>
          <Button onClick={onClick} value="APPROVAL">승인</Button>
          <Button onClick={onClick} value="CANCEL">거절</Button>
        </EvalContainer>
      </ItemContainer>
      <div>
        {showDiv && showButton}
      </div>
    </>
  );
}

export default CurrentListItem;
