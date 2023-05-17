import styled from 'styled-components';

export const SideBar = styled.div`
    display: flex;
    background-color: white;
    height: 100vh;
    width: 256px;
    // box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border-radius: 5px;
    margin-top: 50px;
    margin-left: 40px;
    margin-bottom: 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px 10px 10px;
`;

export const Title = styled.p`
    display: flex;
`;

export const Items = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    // margin-botton: 10px;
    border-radius: 10px;
    margin: 20px 0px;
    justify-content: center;
    align-items: center;
`;

export const ListContainer = styled.div`
    display: flex
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
    margin-bottom: 10px
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

export const IconImg = styled.img`
    width: 16px;
    height: 16px;
`;

export const ProfileImg = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;
    margin-right: 10px;
    text-align: center;
`;

export const StyledParagraph = styled.p`
    margin: 0px;
    font-size: 11px;
    .profile {
        margin-bottom: 7px;
        font-size: 13px;
    }
    .date {
        color: gray;
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
    margin: auto 10px;
    .heart {
        background-color: #FF3B3B;
    }
    .social {
        background-color: #caa969;
    }
`;

// export const Profile = styled.div`
// `;

export const Dealt = styled.div`
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
  justify-content: center;
  align-items: center;
  margin: 10px 0px 10px 0px;
`;

export const Content = styled.p`
    width: 12rem;
    text-align: c
    height: 3rem;
    background-color: #ffffff;
    color: black;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
