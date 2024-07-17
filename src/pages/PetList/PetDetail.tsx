/* eslint-disable no-return-assign */
import React from "react";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import styled from "styled-components";
import heart from "../../assets/heart.png";
import social from "../../assets/social.png";
import { string } from "zod";
import { IPartyDogList } from "./types/parties";

const Progress = styled.div`
  width: 148px;
  height: 10px;
  background-color: white;
  border: 2px solid gray;
  border-radius: 5px;
  margin: auto 10px;
`;

interface IDealt {
  dealt: number;
}

const Dealt = styled.div<IDealt>`
  background-color: red;
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #caa969;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  height: 30px;
  box-shadow:
    rgba(0, 0, 0, 0.2) 0px 3px 3px -2px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  cursor: pointer;
  color: white;
`;

interface IProps {
  pet: IPartyDogList;
  onToggle: (str: string) => void;
  handleRemoveDog: (dogId: number) => void;
  isLeader: boolean;
}

function PetDetail({ pet, onToggle, handleRemoveDog, isLeader }: IProps) {
  const navigate = useNavigate();
  const petSpec = [
    { name: "견종", value: pet.dogBreed },
    { name: "생일", value: pet.dogBirth },
    { name: "성별", value: pet.dogGender },
    { name: "중성화 여부", value: pet.dogNeutralization ? "O" : "X" },
    { name: "몸무게", value: pet.dogWeight },
    { name: "등록코드", value: pet.dogIsbn },
  ];
  const onClickSocilization = () => {
    navigate(`./userEvaluation/${pet.dogId}`);
  };

  const detail = (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="pet-first">
          <div className="pet-img-group">
            <img className="pet-img" src={pet.dogImg} alt="반려견 프로필 사진" />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={heart} alt="heart" style={{ width: "16px", height: "16px" }} />
                <Progress>
                  <Dealt dealt={pet.dogAffectionTemperature} />
                </Progress>
                <p style={{ fontSize: "11px", margin: "0px", color: "#CAA969" }}>{pet.dogAffectionTemperature}%</p>
              </div>
              <Button onClick={() => navigate("../calendar")}>애정도 올리러 가기</Button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <img src={social} alt="social" style={{ width: "16px", height: "16px" }} />
                <Progress>
                  <Dealt dealt={pet.dogSocializationDegree} />
                </Progress>
                <p style={{ fontSize: "11px", margin: "0px", color: "#CAA969" }}>{pet.dogSocializationDegree}%</p>
              </div>
              <Button onClick={onClickSocilization}>반려견 사회성 등록</Button>
            </div>
            <div>
              {/* <button
                onClick={() => handleRemoveDog(pet.dogId)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "red";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "black";
                }}
                style={{
                  display: isLeader ? "inline-block" : "none",
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                  marginTop: "20px",
                  width: "120px",
                  height: "30px",
                }}
              >
                반려견 삭제하기
              </button> */}
            </div>
          </div>
          <div className="pet-info">
            <div className="pet-name">
              <h2>{pet.dogName}</h2>
            </div>
            <div className="pet-spec">
              <Grid container ml={2}>
                {petSpec.map((spec) => (
                  <React.Fragment key={spec.name}>
                    <Grid item xs={6}>
                      <Typography>{spec.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{spec.value}</Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
            <button onClick={() => onToggle("modify")}>수정</button>
          </div>
        </div>
      </div>
      <div>
        <ChevronLeftOutlinedIcon className="up-icon" fontSize="large" onClick={() => onToggle("simple")} />
      </div>
    </>
  );

  return <>{detail}</>;
}

export default PetDetail;
