import React from 'react';
import DoneListItem from './DoneListItem';
import { Items, Title, ListContainer } from '../../styles/sidebar/SidebarStyle';

function DoneList({ doneReservations, setPrintBody }) {
  return (
    <ListContainer>
      <Title>이용 완료 목록</Title>
      <Items>
        {doneReservations.map((currentItem) => {
          return <DoneListItem key={currentItem.reservationId} item={currentItem} setPrintBody={setPrintBody} />;
        })}
      </Items>
    </ListContainer>
  );
}

export default DoneList;
