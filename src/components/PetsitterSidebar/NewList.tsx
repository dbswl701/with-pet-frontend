import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import NewListItem from "./NewListItem";
import DogListItem from "./DogListItem";

interface IProps {
  payedReservations: IDogInfo[];
  handleRemoveNew: (id: number) => void;
  handleApprove: (id: number, reservation: IDogInfo) => void;
}

function NewList({
  payedReservations,
  handleRemoveNew,
  handleApprove,
}: IProps) {
  return (
    <ListContainer className="list">
      <Title>신규 요청 목록</Title>
      <Items>
        {payedReservations.map((currentItem) => {
          return (
            <NewListItem
              key={currentItem.reservationId}
              item={currentItem}
              handleRemoveNew={handleRemoveNew}
              handleApprove={handleApprove}
            />
            //   <div key={currentItem.reservationId}>
            //   <DogListItem item={currentItem} setPrintBody={setPrintBody} />
            //   <button
            //     style={{
            //       backgroundColor: "white",
            //       border: "1px solid #CAA969",
            //       borderRadius: "10PX",
            //       cursor: "pointer",
            //     }}
            //     onClick={() => setPrintBody(["diary", currentItem.dogId])}
            //   >
            //     일지
            //   </button>
            // </div>
          );
        })}
      </Items>
    </ListContainer>
  );
}

export default NewList;
