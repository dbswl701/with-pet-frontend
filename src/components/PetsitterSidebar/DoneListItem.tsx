import React from "react";
import social from "../../assets/social.png";
import heart from "../../assets/heart.png";
import {
  ItemContainer,
  Dealt,
  Progress,
  Button,
  ProfileImg,
  IconImg,
  InfoContainer,
  EvalContainer,
  ProfileContainer,
  BarContainer,
} from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";

interface IProps {
  item: IDogInfo;
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

function DoneListItem({ item, setPrintBody }: IProps) {
  const onClick = () => {
    setPrintBody(["eval", item.reservationId]);
  };
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
          <BarContainer>
            <EvalContainer>
              <IconImg src={social} alt="social" />
              <Button onClick={onClick}>평가하기</Button>
            </EvalContainer>
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
