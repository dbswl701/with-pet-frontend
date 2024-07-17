import React, { useState } from "react";
import axios from "axios";
import crown from "../../assets/crown.png";
import { IPartiesRes, IPartyMemberList } from "./types/parties";
import * as S from "./Pet.styles";

interface IProps {
  user: IPartyMemberList;
  isLeader: boolean;
  handleExpelMember: (userId: number) => void;
  noneDisplay: any;
}

function UserItem({ user, isLeader, handleExpelMember, noneDisplay }: IProps) {
  const [showDiv, setShowDiv] = useState(false);
  const content = (
    <>
      <img
        src={user.memberProfileImg}
        alt="유저 이미지"
        style={{
          border: "1px solid black",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <p>{user.memberName}</p>
    </>
  );
  return (
    <div
      onMouseEnter={() => setShowDiv(true)}
      onMouseLeave={() => setShowDiv(false)}
      onClick={() => handleExpelMember(user.memberId)}
      style={{
        width: "120px",
        backgroundColor: showDiv && isLeader ? "red" : "white",
        display: noneDisplay[user.memberId] ? "none" : "flex",
        marginLeft: "30px",
        alignItems: "center",
        border: "1px solid rgb(200, 200, 200)",
        height: "40px",
        borderRadius: "5px",
        padding: "0px 10px",
        justifyContent: "center",
      }}
    >
      {showDiv && isLeader ? <p style={{ color: "white" }}>X</p> : content}
    </div>
  );
}

interface IProps2 {
  party: IPartiesRes;
  isLeader: boolean;
  handleLeaveParty: (partyId: number) => void;
}

function Party({ party, isLeader, handleLeaveParty }: IProps2) {
  const [noneDisplay, setNoneDisplay] = useState({});
  const handleExpelMember = (userId: number) => {
    if (isLeader) {
      axios
        .delete(`https://withpet.site/api/v1/groups/${party.partyId}/members/${userId}`, { withCredentials: true })
        .then(() => {
          setNoneDisplay((prevState) => ({ ...prevState, [userId]: true }));
        });
    }
  };
  console.log("noneDisplay:", noneDisplay);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 20px",
          marginTop: "30px",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px",
          height: "60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <h1>{party.partyName}</h1>
            <div
              style={{
                display: "flex",
                marginLeft: "30px",
                alignItems: "center",
                border: "1px solid rgb(200, 200, 200)",
                height: "40px",
                borderRadius: "5px",
                padding: "0px 10px",
              }}
            >
              <img
                src={party.partyLeaderImg}
                alt="유저 이미지"
                style={{
                  border: "1px solid black",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <p>{party.partyLeaderName}</p>
              <img src={crown} alt="왕관" style={{ width: "20px", height: "20px" }} />
            </div>
          </div>
          {party.partyMemberList &&
            party.partyMemberList.map((user) => (
              <UserItem
                key={user.memberId}
                user={user}
                isLeader={isLeader}
                handleExpelMember={handleExpelMember}
                noneDisplay={noneDisplay}
              />
            ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0px", fontSize: "13px" }}>
            그룹 코드: <b>{party.partyIsbn}</b>
          </p>
          <S.LeavePartyButton onClick={() => handleLeaveParty(party.partyId)}>그룹 탈퇴</S.LeavePartyButton>
        </div>
      </div>
    </>
  );
}

export default Party;
