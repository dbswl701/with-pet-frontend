import React from 'react';
import { ListContainer, Content } from '../../styles/sidebar/SidebarStyle';

function Profit({ monthProfit }) {
  return (
    <ListContainer className="admin">
      <Content>총 매출: {monthProfit} 원</Content>
    </ListContainer>
  );
}

export default Profit;
