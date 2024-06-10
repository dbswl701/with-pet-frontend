import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    background-opacity: 100;
    border: 1px solid #CAA969;
    border-radius: 10px;
    width: 70%;
    align-items: center;
    flex-direction: column;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 150px auto;
    padding: auto 200px;
`;

export const Label = styled.label`
    height: 40px;
    width: 100px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
`;

export const InputButton = styled.input`
    height: 40px;
    width: 60px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

export const Content = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 70vw;
    background-opacity: 100;
    align-items: center;
    flex-direction: column;
`;

export const DivContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin: 20px 0 20px 0;
    width: 50vw;
    .list {
        flex-direction: row;
    }
`;

export const Title = styled.div`
    font-size: 15px;
    color: #caa969;
    font-weight: bold;
    font-family: 'Noto Sans KR', sans-serif;
    text-align: left;
    width: 50vw;
    margin: 2% 0 2% 0;
`;

export const Button = styled.button`
    height: 40px;
    width: 100px;
    cursor: pointer;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

// 삭제
export const CancelButton = styled.input`
    height: 20px;
    width: 20px;
    opacity: 100;
    color: red;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border-radius: 5px;
    border: none;
    flex-direction: row;
    justify-content: flex-start;
`;

export const LabelContainer = styled.label`
    display: block;
    text-align: center;
    align-content: center;
    justify-content: center;
    height: 40px;
    width: 100px;   
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #CAA969;
    color: white;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
    border: none;
    border-radius: 5px;
`;

// 집 사진 업데이트
export const HouseImgList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 900px;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const HouseImgContainer = styled.div`
  width: 212px;
  height: 138px;
  border-radius: 10px;
`;

export const HouseImg = styled.img`
  width: 212px;
  height: 138px;
  border-radius: 10px;
  border: ${(props) => (props.isRepresentative ? '3px solid rgb(128, 103, 55)' : '1px solid #CAA969')};
  cursor: pointer;
  &: hover {
    opacity: 0.3;
  }
`;

export const HouseImgLabel = styled.label`
  margin: 0px;
  display: flex;
  border-radius: 10px;
  width: 212px;
  height: 138px;
  border: 1px solid #CAA969;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const HouseImgInput = styled.input`
  display: none;
`;

// 해시태그
export const HashTagInput = styled.input`
  border: 1px solid #CAA969;
  width: 550px;
  height: 50px;
  padding-left: 15px;
  border-radius: 10px;
`;

export const HashTagButton = styled.input`
height: 55px;
width: 110px;
cursor: pointer;
margin-left: 10px;
background-color: #CAA969;
color: white;
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
border: none;
border-radius: 10px;
`;

export const HashTagList = styled.div`
display: flex;
margin-top: 10px;
gap: 10px;
`;

export const HashTagItem = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #CAA969;
  border-radius: 100px;
  height: 40px;
  justify-content: center;
  align-items: center;
  padding: 0px 10px;
  gap: 5px;
`;

export const HashTag = styled.p`
  color: white;
`;

export const HasTagCancleBtn = styled.input`
height: 20px;
width: 20px;
background-color: transparent;
border: none;
opacity: 50%;
font-weight: bold;
`;

// 소개글
export const IntroTextField = styled.textarea`
  resize: none;
  width: 100%;
  height: 300px;
  border: 1px solid #CAA969;
  border-radius: 10px;
  padding: 10px;
  font-size: 1.2rem;
`;

// 자격증
export const LicenseImg = styled.img`
  height: 300px;
  width: 500px;
  border-radius: 5px;
`;

// 서비스
export const ServiceList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const ServiceItem = styled.div`
  cursor: pointer;
  background-color: #F2F2F2;
  width: 214px;
  height: 95px;
  border-radius: 10px;
  padding: 30px;
  font-size: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// 서비스
export const ServiceInnerContainer = styled.div`
  gap: 13px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const ServiceImg = styled.img`
  width: 30px;
  height: 30px;
  margin: auto 0px;
`;

export const ServiceIntroContainer = styled.div``;

export const ServiceTitle = styled.p`
  font-weight: bold;
`;

export const ServiceIntro = styled.p`
  color: #999999;
`;

export const ServicePriceInput = styled.input`
  padding-left: 6px;
  width: 105px;
  height: 20px;
  border-radius: 5px;
  border: none;

  /* 화살표 숨기기 */
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const ServicePriceBtn = styled.input`
  height: 20px;
  width: 45px;
  margin-bottom: 10px;
  background-color: #CAA969;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  border: none;
  border-radius: 5px;
`;

export const ServicePriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

// AddedSErviceList
export const AddedServiceContainer = styled(ServiceItem)`
  background-color: ${(props) => (props.isIncluded ? '#FAF6F0' : '#F2F2F2')};
  color: ${(props) => (props.isIncluded ? '#CAA969' : 'gray')};
`;

// 오류 메시지
export const ErrorMsg = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #d61717;
`;
