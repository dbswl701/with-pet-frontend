import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60rem;
  // height: 90vh;
  background-color: #fffaf0;
  outline: 1px solid #caa969;
  // margin: 30px auto 60px auto;
  margin: 70px auto;
  padding: 40px 64px;
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
  margin-bottom: 20px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;

export const ModifyIcon = styled.span`
  display: flex;
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 10;
  background-color: #bcbcbc;
  border-radius: 50%;
  cursor: pointer;
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
  padding-left: 10px;
  // margin-top: 8px;
`;

export const LogoContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckButton = styled.button`
  background-color: ${(props) => (props.disabled ? 'transparent' : '#CAA969')};
  color: ${(props) => (props.disabled ? '#CAA969' : 'white')};
  border: ${(props) => (props.disabled ? '1px solid #CAA969' : 'none')};
  width: 80px;
  // height: 24px;
  // margin-top: 31px;
`;

export const Title = styled.p`
  // margin: 31px 0 0 0;
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  color: #696969;
  text-align: left;
  // display: flex;
`;

export const InputContainer = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: red;
  margin-top: 20px;
  `;

export const CheckContainer = styled.div`
  display: flex;
  width: 326px;
`;

export const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorMessage = styled.p`
  font-size: 0.8rem;
  color: #d61717;
  margin: 0;
  margin: 0.2rem 0 0 11rem;
`;

export const InputContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Time = styled.p`
  position: absolute;
  right: 80px;
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
`;
