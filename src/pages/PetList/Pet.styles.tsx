import styled from "styled-components";

// 그룹 탈퇴
export const LeavePartyButton = styled.button`
  border: 1px solid red;
  margin-top: 10px;
  width: 100px;
  height: 25px;
  background-color: white;
  color: black;
  &:hover {
    background-color: red;
    color: white;
  }
`;
