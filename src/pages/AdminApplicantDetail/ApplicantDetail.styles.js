import styled from 'styled-components';

export const Container = styled.div`
  margin: 150px auto;
  width: 70vw;
  padding: 30px;
  border: 1px solid #CAA969;
  borderRadius: 5px;
`;

export const Title = styled.h1``;

export const DescriptionSub = styled.p`
  font-size: 15px;
  color: #7C7C7C;
  letter-spacing: -0.05em;
`;

export const SubTItle = styled.p`
  font-size: 24px;
  margin: 30px 0px 16px 0px;
  font-weight: bold;
`;

export const Button = styled.button`
  width: 100px;
  height: 40px;
  cursor: pointer;
  background-color: ${(props) => (props.approve ? '#CAA969' : 'white')};
  color: ${(props) => (!props.approve ? '#CAA969' : 'white')};
  border: ${(props) => (!props.approve ? '1px solid #CAA969' : '1px solid white')};
`;
