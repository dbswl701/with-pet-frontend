import React from 'react';
import styled from 'styled-components';

function UserSidebar() {
  const SideBar = styled.div`
    display: flex;
    background-color: red;
    height: 100vh;
    width: 250px;
  `;

  return (
    <>
      <SideBar>
        사이드바
      </SideBar>
    </>
  );
}

export default UserSidebar;
