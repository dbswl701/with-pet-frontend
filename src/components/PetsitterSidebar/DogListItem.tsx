import React from "react";
import social from "../../assets/social.png";
import heart from "../../assets/heart.png";
import {
  ItemContainer,
  Dealt,
  Progress,
  ProfileImg,
  IconImg,
  InfoContainer,
  ProfileContainer,
  EvalContainer,
  BarContainer,
} from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";

interface IProps {
  item: IDogInfo;
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}
function DogListItem({ item, setPrintBody }: IProps) {
  return (
    <>
      <ItemContainer>
        <div>
          <ProfileContainer>
            <ProfileImg src={item.dogImg} alt="img" />
            <InfoContainer>
              <p className="info">
                {item.dogName} | {item.reservationCost}
              </p>
              <p className="period">
                {item.reservationCheckIn} ~ {item.reservationCheckOut}
              </p>
            </InfoContainer>
          </ProfileContainer>
          <BarContainer className="bar">
            <EvalContainer>
              <IconImg className="heart" src={heart} alt="heart" />
              <Progress className="heart">
                <Dealt className="heart" dealt={item.dogAffectionTemperature} />
              </Progress>
              <p className="heart">{item.dogAffectionTemperature}%</p>
            </EvalContainer>
            <EvalContainer>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt
                  className="social"
                  dealt={item.dogSocializationTemperature}
                />
              </Progress>
              <p className="social">{item.dogSocializationTemperature}%</p>
            </EvalContainer>
            <EvalContainer>
              <IconImg className="social" src={social} alt="social" />
              <Progress className="social">
                <Dealt className="social" dealt={item.dogSocializationDegree} />
              </Progress>
              <p className="social">{item.dogSocializationDegree}%</p>
            </EvalContainer>
          </BarContainer>
        </div>
      </ItemContainer>
    </>
  );
}

export default DogListItem;
