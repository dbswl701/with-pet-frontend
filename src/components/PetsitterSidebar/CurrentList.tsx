import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import CurrentListItem from "./CurrentListItem";

interface IProps {
  useReservations: IDogInfo[];
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}
function CurrentList({ useReservations, setPrintBody }: IProps) {
  return (
    <ListContainer>
      <Title>현재 이용자 목록</Title>
      <Items>
        {useReservations.map((currentItem) => {
          return (
            <CurrentListItem
              key={currentItem.reservationId}
              item={currentItem}
              setPrintBody={setPrintBody}
            />
          );
        })}
      </Items>
    </ListContainer>
  );
}

export default CurrentList;
