import React from 'react';
import axios from 'axios';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';
import {
  ItemContainer, Dealt, Progress, ProfileImg, BarContainer, IconImg, InfoContainer, ProfileContainer, EvalContainer, Button,
} from '../../styles/sidebar/SidebarStyle';

function CurrentListItem({ item, handleRemoveNew, handleApprove }) {
  const onAccept = (e) => {
    const reservationStatus = {
      reservationId: item.reservationId,
      status: e.target.value,
    };
    axios.put('https://withpet.site/api/v1/reservation/reservation-accept', reservationStatus, { withCredentials: true })
      .then((res) => {
        handleRemoveNew(res.data.result.reservationId);
        if (e.target.value === 'APPROVAL') {
          handleApprove(res.data.result.reservationId, res.data.result);
        }
      });
  };

  const onRefuse = (e) => {
    const reservationStatus = {
      reservationId: item.reservationId,
      status: e.target.value,
    };
    axios.post('https://withpet.site/api/v1/reservation/reservation-refuse', reservationStatus, { withCredentials: true })
      .then((res) => {
        handleRemoveNew(item.reservationId);
        if (e.target.value === 'APPROVAL') {
          handleApprove(item.reservationId, res.data.result);
        }
      });
  };
  return (
    <>
      <ItemContainer>
        <div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
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
              </BarContainer>
            </div>
          </div>
          <EvalContainer style={{ flexDirection: 'column' }}>
            <Button onClick={onAccept} value="APPROVAL">승인</Button>
            <Button onClick={onRefuse} value="REFUSE">거절</Button>
          </EvalContainer>
        </div>
      </ItemContainer>
    </>
  );
}

export default CurrentListItem;
