import React, { useState } from 'react';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import {
  ItemContainer, Button, ProfileImg, IconImg, InfoContainer, EvalContainer, ProfileContainer,
} from '../../styles/sidebar/SidebarStyle';

// const ItemContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   border-radius:10px;
//   margin: 20px 0px;
// `;

// const Button = styled.button`
//   width: 190px;
//   height: 40px;
//   background-color: white;
//   border: 1px solid #CAA969;
//   border-radius: 3px;
// `;

function DoneListItem({ item, setPrintBody }) {
  // console.log(item);
  const [showDiv, setShowDiv] = useState(false);
  const showButton = (
    <>
      <button>일지</button>
      <button>상세</button>
    </>
  );

  const onClick = () => {
    setPrintBody(['eval', item.reservationId]);
  };
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
          <IconImg src={social} alt="social" />
          <Button onClick={onClick}>평가하기</Button>
        </EvalContainer>
        <div>
          {showDiv && showButton}
        </div>
      </ItemContainer>
    </>
  );
}

export default DoneListItem;
