import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
import axios from 'axios';
// import { useNavigate } from 'react-router';
import CurrentList from './CurrentList';
import NewList from './NewList';
import DoneList from './DoneList';
import Profit from './Profit';
import { SideBar } from '../../styles/sidebar/SidebarStyle';
// const SideBar = styled.div`
// display: flex;
// background-color: white;
// height: 100vh;
// width: 256px;
// box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
// border-radius: 5px;
// margin-top: 50px;
// margin-left: 40px;
// flex-direction: column;
// `;

function PetsitterSidebar({ setPrintBody, selectedMonth }) {
  // const navigate = useNavigate();
  const [useReservations, setUseReservations] = useState([]);
  const [newReservations, setNewReservations] = useState([]);
  const [doneReservations, setDoneReservations] = useState([]);
  const [monthProfit, setMonthProfit] = useState(0);
  useEffect(() => { // 여기 달 고정 바꿔야함.
    axios.get(`https://withpet.site/api/v1/calendar/petsitter-calendar?month=${selectedMonth}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data.result);
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
