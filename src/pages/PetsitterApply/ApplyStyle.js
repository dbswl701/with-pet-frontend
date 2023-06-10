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
    // .select2 input[type=radio] {
    //     position: absolute;
    //     left: -9999px;
    // }
    // .select2 input[type=radio]+label {
    //     display: inline-block;
    //     cursor: pointer;
    //     height: 40px;
    //     width: 60px;
    //     border: 2px solid white;
    //     border-radius: 5px;
    //     text-align: center;
    //     vertical-align: center;
    //     padding: 5px;
    //     margin-left: 5px;
    //     background-color: white;
    // }
    // .select2 input[type=radio]+label:hover {
    //     background-color: #caa969;
    //     border: 2px solid #caa969;
    //     color: white;
    // }
    
    // .select2 input[type=radio]:checked+label:after {
    //     border: 2px solid rgb(153, 121, 85);
    //     background-color: #caa969;
    // }
`;

export const StyledInput = styled.input`
    width: 60px;
    height: 40px;
    background-color: #CAA969;
    border: none;
    border-radius: 5px;
    color: white;
`;
