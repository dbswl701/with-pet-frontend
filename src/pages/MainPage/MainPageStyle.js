import styled from 'styled-components';
// import { Select } from '@mui/material';
import dogBanner from '../../assets/dog_banner.png';

export const Background = styled.div`
    // background-image: url(${dogBanner});
    position: absolute;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: red;
`;

// 전체 레이아웃
export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 80%;
    height: 100%;
    background-color: yellow;
    align-items: center;
    flex-direction: column;
`;

export const SelectContainer = styled.div`
    background-color: purple;
    display: flex;
    margin-top: 25%;
    width: 100%;
    justify-content: space-around;
`;

export const SelectWrapper = styled.div`
    width: 30%;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    background-color: blue;
    width: 80rem;
    height: 30rem;
    justify-items: center;
    align-items: center;
    gap: 20px;
    margin: 0 auto;
`;

export const CardWrapper = styled.div`
    background-color: pink;
    height: 100%;
    width: 100%;
`;

export const ImgWrapper = styled.img`
    width: 90%;
    height: 70%;
    background-color: orange;
`;
