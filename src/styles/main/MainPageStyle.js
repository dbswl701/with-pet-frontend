import styled from 'styled-components';
import dogBanner from '../../assets/dog_banner.png';

export const Background = styled.div`
    position: relative;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-opacity: 100;
    font-family: 'Noto Sans KR', sans-serif;
    color: #caa969;
    background-image: url(${dogBanner});
    background-repeat: no-repeat;
    background-position: top;
    background-size: contain;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 80vw;
    height: 100vh;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
`;

export const SelectContainer = styled.div`
    background-color: purple;
    display: flex;
    margin-top: 22%;
    width: 80vw;
    height: 15vh;
    justify-content: space-around;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

export const SelectWrapper = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4% 0 5% 0;
    .select {
        :hover, :focus, :active {
            background-color: #FAF6F0;
        }
    }
`;

export const CardContainer = styled.div`
    margin: 10% 5% 10% 5%;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    width: 80vw;
    height: 60vh;
    justify-content: space-evenly;
    align-items: center;
    gap: 3px;
    justify-items: center;
    align-items: center;
    justify-content: space-evenly;
    align-content: space-evenly;
`;

export const CardWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    :hover {
        background-color: #caa969;
        opacity: 0.5;
    }
`;

export const ImgWrapper = styled.img`
    width: 90%;
    height: 70%;
    background-color: orange;
`;
