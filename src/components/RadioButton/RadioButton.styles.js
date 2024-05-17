import styled from 'styled-components';

export const RadioContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const Label2 = styled.label`
  text-align: center;
  line-height: 48px;
  cursor: pointer;
  height: 48px;
  width: 211px;
  background-color: white;
  border: 1px solid #CAA969;
  border-radius: 5px;

  &: hover {
    background-color: rgb(212, 212, 212);
    border: 2px solid rgb(212, 212, 212);
  }

  input[type="radio"]:checked + & {
    background-color: #CAA969;
    color: white;
  }
`;

export const RadioInput = styled.input.attrs({
  type: 'radio',
})`
  display: none;
`;
