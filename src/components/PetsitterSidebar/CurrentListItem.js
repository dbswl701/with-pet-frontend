import React from 'react';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, ProfileImg, IconImg, StyledParagraph,
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
        <div className="1" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
          <ProfileImg
            src={item.img}
            alt="img"
            // style={{
            //   width: '53px', height: '53px', borderRadius: '50%', marginRight: '10px', textAlign: 'center',
            // }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', margin: '7.5px 0px 7.5px 10px' }}>
            <StyledParagraph className="profile">
              {item.name} | {item.price}
            </StyledParagraph>
            <StyledParagraph className="date" style={{ fontSize: '11px', margin: '0px' }}>{item.start_date} ~ {item.end_date}</StyledParagraph>
          </div>
        </div>
        <div className="heart" style={{ display: 'flex' }}>
          <IconImg src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
          <Progress>
            <Dealt className="heart" dealt={item.heart_degree} />
          </Progress>
          <StyledParagraph className="heart">{item.heart_degree}%</StyledParagraph>
        </div>
        <div className="social" style={{ display: 'flex', marginTop: '5px' }}>
          <IconImg src={social} alt="social" style={{ width: '16px', height: '16px' }} />
          <Progress>
            <Dealt className="social" dealt={item.social_degree} />
          </Progress>
          <StyledParagraph className="social">{item.social_degree}%</StyledParagraph>
        </div>
      </ItemContainer>
    </>
  );
}

export default CurrentListItem;
