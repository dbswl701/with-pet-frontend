import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentList from './CurrentList';
import NewList from './NewList';
import DoneList from './DoneList';
import Profit from './Profit';
import { SideBar } from '../../styles/sidebar/SidebarStyle';

function PetsitterSidebar({ setPrintBody, selectedMonth }) {
  const [useReservations, setUseReservations] = useState([]);
  const [newReservations, setNewReservations] = useState([]);
  const [doneReservations, setDoneReservations] = useState([]);
  const [monthProfit, setMonthProfit] = useState(0);
  useEffect(() => {
    axios.get(`https://withpet.site/api/v1/calendar/petsitter-calendar?month=${selectedMonth}`, { withCredentials: true })
      .then((res) => {
        setUseReservations(res.data.result.useReservations);
        setNewReservations(res.data.result.newReservations);
        setDoneReservations(res.data.result.doneReservations);
        setMonthProfit(res.data.result.monthProfit);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          // eslint-disable-next-line no-alert
          // alert('로그인이 필요한 서비스입니다.');
          // navigate('/login');
        }
      });
  }, [selectedMonth]);

  const handleApprove = (id, data) => {
    setUseReservations(useReservations.concat(data));
  };

  const handleRemoveNew = (id) => {
    setNewReservations(newReservations.filter((temp) => (temp.reservationId !== id)));
  };

  return (
    <>
      <SideBar>
        <CurrentList useReservations={useReservations} setUseReservations={setUseReservations} setPrintBody={setPrintBody} />
        <NewList newReservations={newReservations} handleRemoveNew={handleRemoveNew} handleApprove={handleApprove} />
        <DoneList doneReservations={doneReservations} setDoneReservations={setDoneReservations} setPrintBody={setPrintBody} />
        <Profit monthProfit={monthProfit} />
      </SideBar>
    </>
  );
}

export default PetsitterSidebar;
