import React from "react";
import DoneListItem from "./DoneListItem";
import { Items, Title, ListContainer } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import DogListItem from "./DogListItem";

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
            // <div key={currentItem.reservationId}>
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

export default DoneList;
