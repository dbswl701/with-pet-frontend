<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import NewListItem from './CurrentListItem';
import { ListContainer, Items } from '../../styles/sidebar/SidebarStyle';
// const Title = styled.p`
//   display: flex;
// `;
=======
import React from 'react';
import styled from 'styled-components';
import NewListItem from './NewListItem';
>>>>>>> develop

// const Item = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

<<<<<<< HEAD
// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
//   width: 100%;
//   border-radius: 5px;
//   box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
// `;
=======
const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  // width: 100%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;
>>>>>>> develop

function NewList({ newReservations, handleRemoveNew, handleApprove }) {
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
    <ListContainer className="list">
      <p>신규 요청 목록</p>
      <Items>
        {currentList.map((currentItem) => {
          return <NewListItem key={currentItem.id} item={currentItem} />;
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

  // console.log(newReservations);

  return (
    <Container>
      <Title>신규 요청 목록</Title>

      <Item>
        {newReservations.map((currentItem) => {
          return <NewListItem key={currentItem.reservationId} item={currentItem} handleRemoveNew={handleRemoveNew} handleApprove={handleApprove} />;
>>>>>>> develop
        })}
      </Items>
    </ListContainer>
  );
}

export default NewList;
