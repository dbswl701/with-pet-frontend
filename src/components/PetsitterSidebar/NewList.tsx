import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import NewListItem from "./NewListItem";
import { IDogInfo } from "../../services/petsitterReservation";

interface IProps {
  newReservations: IDogInfo[];
  handleRemoveNew: (id: number) => void;
  handleApprove: (id: number, reservation: IDogInfo) => void;
}

function NewList({ newReservations, handleRemoveNew, handleApprove }: IProps) {
  return (
    <ListContainer className="list">
      <Title>신규 요청 목록</Title>
      <Items>
        {newReservations.map((currentItem) => {
          return (
            <NewListItem
              key={currentItem.reservationId}
              item={currentItem}
              handleRemoveNew={handleRemoveNew}
              handleApprove={handleApprove}
            />
          );
        })}
      </Items>
    </ListContainer>
  );
}

export default NewList;
