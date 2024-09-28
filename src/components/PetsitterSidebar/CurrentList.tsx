import React from "react";
import { ListContainer, Items, Title } from "../../styles/sidebar/SidebarStyle";
import { IDogInfo } from "../../services/petsitterReservation";
import DogListItem from "./DogListItem";

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
            // <CurrentListItem
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

export default CurrentList;
