import styled from 'styled-components';

export const SideBar = styled.div`
    display: flex;
    position: relative;
    background-color: white;
    width: 256px;
    border-radius: 5px;
    margin: 75px 40px 50px 40px;
    flex-direction: column;
    align-items: center;
    padding: 10px 10px 10px 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    #back {
        background-color: #caa969;
        color: white;
    }
`;

export const Title = styled.div`
    display: flex;
    margin: 10px 0px 10px 0px;
    text-align: left;
`;

export const Items = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    margin: 20px 0px;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid gray;
    padding-bottom: 20px;
`;

export const ListContainer = styled.div`
    display: flex
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    margin-bottom: 20px;
`;

export const IconImg = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 10px;
`;

export const ProfileImg = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-right: 10px;
    text-align: center;
`;

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
    .info {
        margin: 0px;
        margin-bottom: 7px;
        font-size: 13px;
    }
    .period {
        font-size: 11px;
        margin: 0px;
        color: gray;
    }
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 7.5px 0px 7.5 10px;
    .info {
        margin: 0px;
        margin-bottom: 7px;
        font-size: 13px;
    }
    .period {
        font-size: 11px;
        margin: 0px;
        color: gray;
    }
`;

export const EvalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-betwween;
    align-items: center;
    padding: 5px 1px 5px 1px;
    p {
        margin: 0px;
        font-size: 11px;
    }
    .heart {
        color: #FF3B3B;
    }
    .social {
        color: #caa969;
    }
`;

export const Progress = styled.div`
    width: 148px;
    height: 10px;
    border-radius: 5px;
    border: 1px solid;
    margin: auto;
    background-opacity: 50%;
    .heart {
        background-color: #FF3B3B;
        border: 1px solid #FF3B3B;
    }
    .social {
        background-color: #caa969;
        border: 1px solid #caa969;
    }
`;

export const CardContainer = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(5, 1fr);
    background-opacity: 100;
    width: 80vw;
    height: 60vh;
    justify-items: center;
    align-content: center;
    justify-content: space-evenly;
    align-items: center;
    gap: 3px;
`;

export const Dealt = styled.div`
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 5px;
  .heart {
    background-color: #FF3B3B;
    border: 1px solid #FF3B3B;
  }
  .social {
      background-color: #caa969;
      border: 1px solid #caa969;
  }
  .socialUser {
    background-color: #64C8F3;
    border: 1px solid #64C8F3;
  }
`;

export const Content = styled.div`
    display: flex;
    width: 12rem;
    text-align: center;
    height: 3rem;
    background-color: #e6e6e6;
    color: black;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 5px;
`;

export const Button = styled.button`
  width: 190px;
  height: 40px;
  background-color: white;
  border: 1px solid #CAA969;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const BarContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const SideButton = styled.button`
    background-color: #CAA969;
    flex-direction: column;
    justify-content: flex-start;
    color: #ffffff;
`;
