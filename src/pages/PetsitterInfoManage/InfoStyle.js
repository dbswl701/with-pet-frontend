import styled from 'styled-components';

export const Container = styled.div`
    // padding: 10% 0 10% 0;
    position: relative;
    display: flex;
    justify-content: center;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
    color: #caa969;
    background-color: #yellow;
    margin: 10% 0 10% 0;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100vw;
    height: 100vh;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
    background-color: #green;
    // text-align: center;
`;

export const DivContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 50vw;
    // background-color: purple;
    .list {
        flex-direction: row;
    }
    // boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px'
`;

export const Input = styled.input`
`;

export const Title = styled.div`
    font-size: 15px;
    font-weight: bold;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: left;
    margin: 2% 0 2% 0;
    dispaly: flex;
    .page {
        font-size: 30px;
        font-weight: bold;
    }
`;

export const Button = styled.button`
    height: 40px;
    width: 100px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

export const CancelButton = styled.button`
    height: 20px;
    opacity: 100;
    color: red;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border-radius: 5px;
    border: none;
    flex-direction: row;
    justify-content: flex-start;
`;
