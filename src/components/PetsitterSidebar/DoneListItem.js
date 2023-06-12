import React from 'react';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, Button, ProfileImg, IconImg, InfoContainer, EvalContainer, ProfileContainer, BarContainer,
} from '../../styles/sidebar/SidebarStyle';

function DoneListItem({ item, setPrintBody }) {
  const onClick = () => {
    setPrintBody(['eval', item.reservationId]);
  };
  return (
    <>
      <ItemContainer>
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
          <BarContainer>
            <EvalContainer>
              <IconImg src={social} alt="social" />
              <Button onClick={onClick}>평가하기</Button>
            </EvalContainer>
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
          </BarContainer>
        </div>
        {/* <div>
          {showDiv && showButton}
        </div> */}
      </ItemContainer>
    </>
  );
}

export default DoneListItem;
