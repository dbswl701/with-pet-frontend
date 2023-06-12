import React from 'react';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, ProfileImg, IconImg, InfoContainer, ProfileContainer, EvalContainer, BarContainer,
} from '../../styles/sidebar/SidebarStyle';

function CurrentListItem({ item, setPrintBody }) {
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
          <BarContainer className="bar">
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
            <EvalContainer>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt className="social" dealt={item.socializationDegree} />
              </Progress>
              <p className="social">{item.socializationDegree}%</p>
            </EvalContainer>
            <button
              style={{
                backgroundColor: 'white', border: '1px solid #CAA969', borderRadius: '10PX', cursor: 'pointer',
              }}
              onClick={() => setPrintBody(['diary', item.dogId])}
            >일지
            </button>
          </BarContainer>
        </div>
      </ItemContainer>
    </>
  );
}

export default CurrentListItem;
