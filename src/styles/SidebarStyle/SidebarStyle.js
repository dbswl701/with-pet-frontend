import styled from 'styled-components';

export const SideBar = styled.div`
display: flex;
background-color: white;
height: 100vh;
width: 256px;
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
border-radius: 5px;
margin-top: 50px;
margin-left: 40px;
flex-direction: column;
justify-content: space-between;
align-items: center;
`;

export const Title = styled.p`
    display: flex;
`;

export const Item = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    width: 100%;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

export const Progress = styled.div`
    width: 148px;
    height: 10px;
    background-color: #FF3B3B;
    border-radius: 5px;
    margin: auto 10px;
`;

export const Dealt = styled.div`
  background-color: #caa969;
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 190px;
  height: 40px;
  background-color: white;
  border: 1px solid #CAA969;
  border-radius: 3px;
`;

export const Content = styled.p`
    width: 12rem;
    text-align: c
    height: 3rem;enter;
    line-height: 50px;
    background-color: #FF3B3B;
    color: #999999;
    justify-content: center;
    align-items: center;

`;

export const ProfitButton = styled.button`
    width: 12rem;
    height: 3rem;
    background-color: #CAA969;
    border: none;
    border-radius: 10px;
    color: white;
`;

export const SelectButton = styled.button`

`;
