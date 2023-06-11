import React from 'react';
import { ListContainer, Items, Title } from '../../styles/sidebar/SidebarStyle';
import NewListItem from './NewListItem';

function NewList({ newReservations, handleRemoveNew, handleApprove }) {
  return (
    <ListContainer className="list">
      <Title>신규 요청 목록</Title>
      <Items>
        {newReservations.map((currentItem) => {
          return <NewListItem key={currentItem.reservationId} item={currentItem} handleRemoveNew={handleRemoveNew} handleApprove={handleApprove} />;
        })}
      </Items>
    </ListContainer>
  );
}

export default NewList;
