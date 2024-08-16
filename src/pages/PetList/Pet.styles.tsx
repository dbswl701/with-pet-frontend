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

// 반려견 삭제하기 버튼
export const DeleteDogButton = styled.button`
  background-color: white;
  color: black;
  cursor: pointer;
  border: none;
  margin-top: 20px;
  width: 120px;
  height: 30px;
  &:hover {
    background-color: red;
    color: white;
  }
`;
