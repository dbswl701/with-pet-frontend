<<<<<<< HEAD
import React from 'react';
// import styled from 'styled-components';
=======
import React, { useState } from 'react';
import styled from 'styled-components';
>>>>>>> develop
import social from '../../assets/social.png';
import {
  ItemContainer, Button, ProfileImg, IconImg, InfoContainer, EvalContainer, ProfileContainer,
} from '../../styles/sidebar/SidebarStyle';

<<<<<<< HEAD
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
=======
const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius:10px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 190px;
  height: 40px;
  background-color: white;
  border: 1px solid #CAA969;
  border-radius: 3px;
  cursor: pointer;
`;
>>>>>>> develop

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
<<<<<<< HEAD
      <ItemContainer>
        <ProfileContainer>
          <ProfileImg src={item.img} alt="img" />
          <InfoContainer>
            <p className="info">
              {item.name} | {item.price}
            </p>
            <p className="period">{item.start_date} ~ {item.end_date}</p>
          </InfoContainer>
        </ProfileContainer>
        <EvalContainer>
          <IconImg src={social} alt="social" />
          <Button>평가하기</Button>
        </EvalContainer>
      </ItemContainer>
=======
      <Container onMouseEnter={() => setShowDiv(true)} onMouseLeave={() => setShowDiv(false)}>
        <div>
          <div className="1" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
            <img
              src={item.dogImg}
              alt="img"
              style={{
                width: '53px', height: '53px', borderRadius: '50%', marginRight: '10px', textAlign: 'center',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '7.5px 0px 7.5px 10px' }}>
              <p style={{ margin: '0px', marginBottom: '7px', fontSize: '13px' }}>
                {item.dogName} | {item.cost}
              </p>
              <p style={{ fontSize: '11px', margin: '0px' }}>{item.checkIn} ~ {item.checkOut}</p>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <img src={social} alt="heart" style={{ width: '16px', height: '16px' }} />
            <Button onClick={onClick}>평가하기</Button>
          </div>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </Container>
>>>>>>> develop
    </>
  );
}

export default DoneListItem;
