// import React from 'react';
// import styled from 'styled-components';
import React, { useState } from 'react';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, ProfileImg, IconImg, InfoContainer, ProfileContainer, EvalContainer,
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

// const ItemContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   border-radius:10px;
//   margin: 20px 0px;
// `;

function CurrentListItem({ item, setPrintBody }) {
  const [showDiv, setShowDiv] = useState(false);
  const showButton = (
    <>
      <button className="sidebuton" onClick={() => setPrintBody(['diary', item.dogId])}>일지</button>
      <button className="sidebutton">상세</button>
    </>
  );

  // console.log(item);
  return (
    <>
      <ItemContainer onMouseEnter={() => setShowDiv(true)} onMouseLeave={() => setShowDiv(false)}>
        <div>
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
            <Progress className="heart">
              <Dealt className="heart" dealt={item.affectionTemperature} />
            </Progress>
            <p className="heart">{item.affectionTemperature}%</p>
          </EvalContainer>
          <EvalContainer>
            <IconImg className="social" src={social} alt="social" />
            <Progress className="social">
              <Dealt className="social" dealt={item.socializationTemperature} />
            </Progress>
            <p className="social">{item.socializationTemperature}%</p>
          </EvalContainer>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </ItemContainer>
      {/*
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
            <img src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
            <Progress>
              <Dealt dealt={item.affectionTemperature} />
            </Progress>
            <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.affectionTemperature}%</p>
          </div>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <img src={social} alt="social" style={{ width: '16px', height: '16px' }} />
            <Progress>
              <Dealt dealt={item.socializationTemperature} />
            </Progress>
            <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.socializationTemperature}%</p>
          </div>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </Container> */}
    </>
  );
}

export default CurrentListItem;
