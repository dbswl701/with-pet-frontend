import React from 'react';
// import styled from 'styled-components';
import CurrentList from './CurrentList';
import NewList from './NewList';
import DoneList from './DoneList';
import Profit from './Profit';
import { SideBar } from '../../styles/SidebarStyle/SidebarStyle';

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

function PetsitterSidebar() {
  return (
    <>
      <SideBar>
        <CurrentList />
        <NewList />
        <DoneList />
        <Profit />
      </SideBar>
    </>
  );
}

export default PetsitterSidebar;
