<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
=======
import React from 'react';
import styled from 'styled-components';
>>>>>>> develop
import DoneListItem from './DoneListItem';
import { Items, ListContainer } from '../../styles/sidebar/SidebarStyle';

// const p = styled.p`
//   display: flex;
// `;

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

<<<<<<< HEAD
// const ListContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   width: 100%;
//   border-radius: 5px;
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
// `;
=======
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  // width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;
>>>>>>> develop

function DoneList({ doneReservations, setPrintBody }) {
  // const [currentList, setCurrentList] = useState([]);

<<<<<<< HEAD
  useEffect(() => {
    axios.get('https://0a2a3de5-9803-4b7e-a4ed-2005928586d5.mock.pstmn.io/api/v1/reservation/1')
      .then((res) => {
        setCurrentList(res.data);
        console.log(res.data);
      })
      .catch(() => {
      });
  }, []);

  return (
    <ListContainer>
      <p>이용 완료 목록</p>
      <Items>
        {currentList.map((currentItem) => {
          return <DoneListItem key={currentItem.id} item={currentItem} />;
=======
  // useEffect(() => {
  //   axios.get('https://d45162fd-d516-4456-83d9-d3b784b62ec2.mock.pstmn.io/api/v1/reservation/1')
  //     .then((res) => {
  //       setCurrentList(res.data);
  //       console.log(res.data);
  //     })
  //     .catch(() => {
  //     });
  // }, []);

  return (
    <Container>
      <Title>이용 완료 목록</Title>

      <Item>
        {doneReservations.map((currentItem) => {
          return <DoneListItem key={currentItem.reservationId} item={currentItem} setPrintBody={setPrintBody} />;
>>>>>>> develop
        })}
      </Items>
    </ListContainer>
  );
}

export default DoneList;
