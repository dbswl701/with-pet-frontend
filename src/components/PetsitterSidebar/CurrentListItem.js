import React from 'react';
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

function CurrentListItem({ item }) {
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
          <IconImg className="heart" src={heart} alt="heart" />
          <Progress>
            <Dealt className="heart" dealt={item.heart_degree} />
          </Progress>
          <p className="heart">{item.heart_degree}%</p>
        </EvalContainer>
        <EvalContainer>
          <IconImg className="social" src={social} alt="social" />
          <Progress>
            <Dealt className="social" dealt={item.social_degree} />
          </Progress>
          <p className="social">{item.social_degree}%</p>
        </EvalContainer>
      </ItemContainer>
    </>
  );
}

export default CurrentListItem;
