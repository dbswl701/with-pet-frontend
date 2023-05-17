import React from 'react';
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

function DoneListItem({ item }) {
  console.log(item);
  return (
    <>
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
    </>
  );
}

export default DoneListItem;
