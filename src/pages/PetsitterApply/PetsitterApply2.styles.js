import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  border: 1px solid #999999;
  width: 70vw;
  border-radius: 10px;
  padding: 80px 130px;
`;

export const SubTitle = styled.h2`
  font-weight: bold;
`;

export const BirthInput = styled.input`
  border-radius: 10px;
  border: 1px solid #CAA969;
  width: 312px;
  height: 40px;
  padding-left: 10px;
`;

export const Description = styled.p`
  color: #999999;
  font-size: 12px;
  font-weight: bold;
  margin-left: 10px;
`;

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  border: 1px solid #CAA969;
  outline-color: rgb(200,158,78);
  padding: 10px;
`;
