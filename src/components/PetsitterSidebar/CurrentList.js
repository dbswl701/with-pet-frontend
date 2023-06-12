import React from 'react';
import CurrentListItem from './CurrentListItem';
import { ListContainer, Items, Title } from '../../styles/sidebar/SidebarStyle';

function CurrentList({ useReservations, setPrintBody }) {
  return (
    <ListContainer>
      <Title>현재 이용자 목록</Title>
      <Items>
        {useReservations.map((currentItem) => {
          return <CurrentListItem key={currentItem.reservationId} item={currentItem} setPrintBody={setPrintBody} />;
        })}
      </Items>
    </ListContainer>
  );
}

export default CurrentList;
