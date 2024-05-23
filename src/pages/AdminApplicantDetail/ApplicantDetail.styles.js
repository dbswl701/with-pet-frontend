import styled from 'styled-components';

export const Container = styled.div`
  margin: 150px auto;
  width: 70vw;
  padding: 50px 80px;
  border: 1px solid #CAA969;
  borderRadius: 5px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 50px;
`;

export const DescriptionSub = styled.p`
  font-size: 15px;
  color: #7C7C7C;
  letter-spacing: -0.05em;
`;

export const SubTItle = styled.p`
  font-size: 24px;
  margin: 30px 0px 16px 0px;
  font-weight: bold;
  padding-top: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

export const Button = styled.button`
  width: 100%;
  height: 60px;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${(props) => (props.approve ? '#CAA969' : 'white')};
  color: ${(props) => (!props.approve ? '#CAA969' : 'white')};
  border: ${(props) => (!props.approve ? '1px solid #CAA969' : '1px solid white')};
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  align-items: center;
`;

export const SubContainer = styled.div`
`;

export const DescriptionContent = styled.p`
  font-size: 14px;
  color: #999999;
`;

export const ProfileImg = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  margin-right: 30px;
`;

export const LicenseImg = styled.img`
  height: 300px;
  border: 1px solid lightgray;
`;

export const BackButton = styled.button`
  background-color: transparent;
  border: none;
  color: #CA9696;
  width: 400px;
  text-align: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  font-size: 1.1rem;
  &:hover {
    background-color: #bcbcbc;
    color: white;
  }
`;

export const UserName = styled.p`
  font-size: 20px;
  margin: 0px;
  margin-right: 10px;
  font-weight: bold;
`;

export const UserAddr = styled.p`
  font-size: 16px;
  margin: 0px;
  color: #999999;
  letter-spaceing: -0.05em;
`;

export const UserInfoSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
