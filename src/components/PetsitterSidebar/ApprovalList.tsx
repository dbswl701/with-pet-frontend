import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import CurrentListItem from "./CurrentListItem";
import ApprovalListItem from "./ApprovalListItem";

interface IProps {
  approvalReservations: IDogInfo[];
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}
function ApprovalList({ approvalReservations, setPrintBody }: IProps) {
  return (
    <ListContainer>
      <Title>승인 목록</Title>
      <Items>
        {approvalReservations.map((currentItem) => {
          return (
            <ApprovalListItem
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

export default ApprovalList;
