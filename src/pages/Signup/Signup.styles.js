import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  // height: 90vh;
  background-color: #fffaf0;
  outline: 1px solid #caa969;
  margin: 30px auto 60px auto;
  padding: 64px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // grid-template-rows: auto 1fr auto;
  // grid-gap: 20px;
  align-items: center;
  border-radius: 5px;
  padding: 20px;
  width: flex;
`;

export const ImageContainer = styled.div`
  justify-self: center;
  background-color: #fff;
  border: 1px solid #caa969;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const Button = styled.button`
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 31px;
  width: 318px;
  height: 44px;
`;

export const Input = styled.input`
  width: 326px;
  height: 47px;
  margin-top: 8px;
`;

export const LogoContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckButton = styled.button`
  background-color: #CAA969;
  color: white;
  border: none;
  width: 72px;
  height: 24px;
  margin-top: 31px;
`;

export const Title = styled.p`
  margin: 31px 0 0 0;
  font-weight: bold;
  font-size: 16px;
  color: #696969;
  text-align: left;
  display: flex;
`;
