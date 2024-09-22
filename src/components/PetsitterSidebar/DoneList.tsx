import React from "react";
import DoneListItem from "./DoneListItem";
import { Items, Title, ListContainer } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";

interface IProps {
  doneReservations: IDogInfo[];
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}

function DoneList({ doneReservations, setPrintBody }: IProps) {
  return (
    <ListContainer>
      <Title>이용 완료 목록</Title>
      <Items>
        {doneReservations.map((currentItem) => {
          return (
            <DoneListItem
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

export default DoneList;
