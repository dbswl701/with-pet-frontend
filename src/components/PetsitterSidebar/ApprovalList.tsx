import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import DogListItem from "./DogListItem";

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
            // <ApprovalListItem
            //   key={currentItem.reservationId}
            //   item={currentItem}
            //   setPrintBody={setPrintBody}
            // />
            <div key={currentItem.reservationId}>
              <DogListItem item={currentItem} setPrintBody={setPrintBody} />
              <button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #CAA969",
                  borderRadius: "10PX",
                  cursor: "pointer",
                }}
                onClick={() => setPrintBody(["diary", currentItem.dogId])}
              >
                일지
              </button>
            </div>
          );
        })}
      </Items>
    </ListContainer>
  );
}

export default ApprovalList;
