import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Form = styled.form`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-gap: 20px;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  outline: 1px solid #f3deb5;
  padding: 20px;
  width: flex;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Title = styled.h1`
  grid-row: 1;
  text-align: center;
`;

const ImageContainer = styled.div`
  grid-row: 2;
  justify-self: center;

  img {
    max-width: 200px;
    height: auto;
  }
`;

const InputContainer = styled.div`
  grid-row: 2;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  input::placeholder {
    color: #ddd;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  span {
    margin-top: 5px;
    font-size: 12px;
    color: #888;
    text-align: left;
  }
`;

const InputContainer2 = styled.div`
  grid-row: 2;
  grid-column: 3;
  display: flex;
  flex-direction: column;
  input::placeholder {
    color: #ddd;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
  }

  span {
    margin-top: 5px;
    font-size: 12px;
    color: #777;
    text-align: left;
  }
`;

const Button = styled.button`
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  grid-row: 3;
  justify-self: center;
`;

const url = "https://withpet.site/api/v1/users/my-info";

function EditProfile() {
  const [imageSrc, setImageSrc] = useState("");
  const [modifyInfo, setModifyInfo] = useState({});

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setModifyInfo({
          ...modifyInfo,
          profileImg: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        const info = response.data.result;
        setModifyInfo({
          detailAdr: info.address.detailAdr,
          streetAdr: info.address.streetAdr,
          zipcode: info.address.zipcode,
          phoneNum: info.phoneNum,
          profileImg: info.profileImg,
          userEmail: info.userEmail,
          userId: info.userId,
          userName: info.userName,
        });
        setImageSrc(info.profileImg);
      })
      .catch(() => {});
  }, []);

  const onChange = (e) => {
    const { value, name } = e.target;
    setModifyInfo({
      ...modifyInfo,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const info = {
      address: {
        detailAdr: modifyInfo.detailAdr,
        streetAdr: modifyInfo.streetAdr,
        zipcode: modifyInfo.zipcode,
      },
      phoneNum: modifyInfo.phoneNum,
      profileImg: modifyInfo.profileImg,
      userEmail: modifyInfo.userEmail,
      userName: modifyInfo.userName,
      userPassword: "ajounice1234!",
    };

    axios
      .put(url, info, { withCredentials: true })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원정보 수정</Title>
        <GridContainer>
          <ImageContainer>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </ImageContainer>
          <input type="file" onChange={handleChangeImage} />
          <InputContainer>
            <label>이름</label>
            <input
              type="text"
              value={modifyInfo.userName || ""}
              onChange={onChange}
              name="userName"
              placeholder="위드펫"
            />
            <label>전화번호</label>
            <input
              type="tel"
              value={modifyInfo.phoneNum || ""}
              onChange={onChange}
              name="phoneNum"
              placeholder="010-1234-5678"
            />
            <label>이메일</label>
            <input
              type="email"
              value={modifyInfo.userEmail || ""}
              onChange={onChange}
              name="userEmail"
              placeholder="withpet1@gmail.com"
            />
          </InputContainer>
          <InputContainer2>
            <label>우편번호</label>
            <input
              type="text"
              value={modifyInfo.zipcode || ""}
              onChange={onChange}
              name="zipcode"
              placeholder="12345"
            />
            <label>도로명주소</label>
            <input
              type="text"
              value={modifyInfo.streetAdr || ""}
              onChange={onChange}
              name="streetAdr"
              placeholder="경기도 수원시 영통구 아주로1번길 12"
            />
            <label>상세주소</label>
            <input
              type="text"
              value={modifyInfo.detailAdr || ""}
              onChange={onChange}
              name="detailAdr"
              placeholder="123동 123호"
            />
          </InputContainer2>
        </GridContainer>
        <ButtonContainer>
          <Button type="submit">수정하기</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

export default EditProfile;
