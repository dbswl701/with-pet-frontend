import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CurrentList from './CurrentList';
import NewList from './NewList';
import DoneList from './DoneList';
import Profit from './Profit';

const SideBar = styled.div`
display: flex;
background-color: white;
height: 100vh;
width: 256px;
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
border-radius: 5px;
margin-top: 50px;
margin-left: 40px;
flex-direction: column;
`;

function PetsitterSidebar() {
  const [useReservations, setUseReservations] = useState([]);
  const [newReservations, setNewReservations] = useState([]);
  const [doneReservations, setDoneReservations] = useState([]);

  useEffect(() => {
    axios.get('https://withpet.site/api/v1/calendar/petsitter-calendar?month=2023-05', { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setUseReservations(res.data.result.useReservations);
        setNewReservations(res.data.result.newReservations);
        setDoneReservations(res.data.result.doneReservations);
      });
  }, []);
  return (
    <>
      <SideBar>
        <CurrentList useReservations={useReservations} />
        <NewList newReservations={newReservations} />
        <DoneList doneReservations={doneReservations} />
        <Profit />
      </SideBar>
    </>
  );
}

export default PetsitterSidebar;
