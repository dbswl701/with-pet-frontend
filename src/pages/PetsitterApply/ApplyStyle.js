import styled from 'styled-components';

export const FormContainer = styled.form`
    position: relative;
    width: 75vw;;
    padding: 10% 20% 10% 20%;
    display: flex;
    justify-content: flex-start ;
    margin: auto;
    background-opacity: 100;
    align-content: center;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
    color: #caa969;
    p {
        align: left;
    }
`;

export const StyledInput = styled.input`
    width: 60px;
    height: 40px;
    background-color: #CAA969;
    border: none;
    border-radius: 5px;
    color: white;
`;
