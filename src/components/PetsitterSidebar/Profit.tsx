import React from "react";
import { ListContainer, Content } from "../../styles/sidebar/SidebarStyle";

interface IProps {
  monthProfit: number;
}
function Profit({ monthProfit }: IProps) {
  return (
    <ListContainer className="admin">
      <Content>총 매출: {monthProfit} 원</Content>
    </ListContainer>
  );
}

export default Profit;
