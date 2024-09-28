import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentList from "./CurrentList";
import NewList from "./NewList";
import DoneList from "./DoneList";
import Profit from "./Profit";
import { SideBar } from "../../styles/sidebar/SidebarStyle";
import { useGetPetsitterCalendar } from "../../hooks";
import { IDogInfo } from "../../services/petsitterReservation";
import ApprovalList from "./ApprovalList";

interface IProps {
  setPrintBody: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  selectedMonth: string;
}

function PetsitterSidebar({ setPrintBody, selectedMonth }: IProps) {
  const [useReservations, setUseReservations] = useState<IDogInfo[]>([]);
  const [payedReservations, setPayedReservations] = useState<IDogInfo[]>([]); // new -> payed
  const [doneReservations, setDoneReservations] = useState<IDogInfo[]>([]);
  const [approvalReservations, setApprovalReservations] = useState<IDogInfo[]>(
    []
  );
  const [monthProfit, setMonthProfit] = useState<number>(0);

  const { data: petsitterCalendarData } =
    useGetPetsitterCalendar(selectedMonth);
  useEffect(() => {
    if (petsitterCalendarData) {
      setUseReservations(petsitterCalendarData.useReservations);
      setPayedReservations(petsitterCalendarData.payedReservations);
      setDoneReservations(petsitterCalendarData.doneReservations);
      setApprovalReservations(petsitterCalendarData.approvalReservations);
      setMonthProfit(petsitterCalendarData.reservationMonthProfit);
    }
  }, [petsitterCalendarData]);
  console.log("[sidebar] selectedMonth:", selectedMonth);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://withpet.site/api/v1/calendar/petsitter-calendar?month=${selectedMonth}`,
  //       { withCredentials: true }
  //     )
  //     .then((res) => {
  //       setUseReservations(res.data.result.useReservations);
  //       setNewReservations(res.data.result.newReservations);
  //       setDoneReservations(res.data.result.doneReservations);
  //       setMonthProfit(res.data.result.monthProfit);
  //     })
  //     .catch((err) => {
  //       if (err.response && err.response.status === 401) {
  //         // eslint-disable-next-line no-alert
  //         // alert('로그인이 필요한 서비스입니다.');
  //         // navigate('/login');
  //       }
  //     });
  // }, [selectedMonth]);

  const handleApprove = (id: number, reservation: IDogInfo) => {
    setUseReservations(useReservations.concat(reservation));
  };

  const handleRemoveNew = (id: number) => {
    setPayedReservations(
      payedReservations.filter((temp) => temp.reservationId !== id)
    );
  };

  console.log("monthProfit: ", monthProfit);

  return (
    <>
      <SideBar>
        <CurrentList
          useReservations={useReservations}
          setPrintBody={setPrintBody}
        />
        <ApprovalList
          approvalReservations={approvalReservations}
          setPrintBody={setPrintBody}
        />
        <NewList
          payedReservations={payedReservations}
          handleRemoveNew={handleRemoveNew}
          handleApprove={handleApprove}
        />
        <DoneList
          doneReservations={doneReservations}
          setPrintBody={setPrintBody}
        />
        <Profit monthProfit={monthProfit} />
      </SideBar>
    </>
  );
}

export default PetsitterSidebar;
