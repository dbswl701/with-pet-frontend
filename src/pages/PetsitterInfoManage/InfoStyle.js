import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 5% 0 5% 0;
`;

export const Label = styled.label`
    height: 40px;
    width: 100px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
`;

export const InputButton = styled.input`
    height: 40px;
    width: 60px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 70vw;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
`;

export const DivContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 20px 0 20px 0;
    width: 50vw;
    .list {
        flex-direction: row;
    }
`;

export const Title = styled.div`
    font-size: 15px;
    color: #caa969;
    font-weight: bold;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: left;
    width: 50vw;
    margin: 2% 0 2% 0;
`;

export const Button = styled.button`
    height: 40px;
    width: 60px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

export const CancelButton = styled.input`
    height: 20px;
    width: 20px;
    opacity: 100;
    color: red;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border-radius: 5px;
    border: none;
    flex-direction: row;
    justify-content: flex-start;
`;

export const LabelContainer = styled.label`
    display: block;
    text-align: center;
    align-content: center;
    justify-content: center;
    height: 40px;
    width: 100px;   
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;
