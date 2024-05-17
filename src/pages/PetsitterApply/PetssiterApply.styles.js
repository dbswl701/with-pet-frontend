import styled from 'styled-components';

export const FormContainer = styled.form`
    // position: relative;
    // width: 75vw;;
    // padding: 10% 20% 10% 20%;
    // display: flex;
    // justify-content: flex-start ;
    // margin: auto;
    // background-opacity: 100;
    // align-content: center;
    // flex-direction: column;
    // font-family: 'Noto Sans KR', sans-serif;
    // color: #caa969;
    // p {
    //     align: left;
    // }

    // width: 70%;
    background-color: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
`;

export const OuterContainer = styled.div`
  background-color: green;
`;

export const StyledInput = styled.input`
    width: 60px;
    height: 40px;
    background-color: #CAA969;
    border: none;
    border-radius: 5px;
    color: white;
`;

export const Container = styled.div`
  border: 1px solid #999999;
  // width: 1500px;
  padding: 100px 150px;
  border-radius: 10px;
`;

export const InnerContainer = styled.div`
// style={{ display: 'flex', flexDirection: 'row', marginBottom: '100px' }}
  display: flex;
  flex-Direction: row;
  justify-content: space-around
`;

export const Label = styled.label`
  display: inline-block;
  cursor: pointer;
  height: 48px;
  width: 211px;
  border: 2px solid white;
  border-radius: 5px;
  text-align: center;
  vertical-align: center;
  line-height: 36px;
  padding: 5px;
  margin-right: 30px;
  background-color: white;

  &: hover {
    background-color: rgb(212, 212, 212);
    border: 2px solid rgb(212, 212, 212);
  }

  input[type="radio"]:checked + & {
    background-color: #CAA969;
    color: white
  }
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
