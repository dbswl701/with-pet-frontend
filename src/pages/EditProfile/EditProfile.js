import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

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
  background-color: #fffaf0;
  border-radius: 5px;
  outline: 1px solid #caa969;
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
  grid-column: 1;
  justify-self: center;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #caa969;
  width: 200px;
  height: 200px;
  display: flex;
  overflow: hidden;

  img {
    max-width: 200px;
    height: auto;
    cursor: pointer;
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

  label {
    font-size: 12px;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #caa969;
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

  label {
    font-size: 12px;
  }

  input {
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #caa969;
  }

  span {
    margin-top: 5px;
    font-size: 12px;
    color: #777;
    text-align: left;
  }
`;

const SearchButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border-radius: 3px;
  border: 0px;
  float: right;
  svg {
    color: #caa969;
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

const url = 'https://withpet.site/api/v1/users/my-info';

function EditProfile() {
  const [modifyInfo, setModifyInfo] = useState({});
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append('file', img);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    axios.post('https://withpet.site/api/v1/file/upload', formData, config)
      .then((res) => {
        setModifyInfo({
          ...modifyInfo,
          profileImg: res.data.result[0],
        });
      });
  };

  const handleClickFindAddress = () => {
    new window.daum.Postcode({
      oncomplete(data) {
        setModifyInfo({
          ...modifyInfo,
          zipcode: data.zonecode,
          streetAdr: data.address,
        });
      },
      width: 430,
      height: 600,
      popupName: 'postcodePopup',
    }).open();
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
      userPassword: 'ajounice0302!',
    };

    axios
      .put(url, info, { withCredentials: true })
      .then((res) => {
        // eslint-disable-next-line no-alert
        alert('회원정보 수정이 완료되었습니다.');
        navigate('../');
        window.location.reload(); // 페이지 새로고침
        localStorage.setItem('userInfo', JSON.stringify(res.data.result));
      })
      .catch(() => {});
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>회원정보 수정</Title>
        <GridContainer>
          <ImageContainer>
            <label htmlFor="image-select">
              <img src={modifyInfo.profileImg} alt="preview-img" />
            </label>
          </ImageContainer>
          <input
            type="file"
            accept="image/*"
            id="image-select"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <InputContainer>
            <p>이름</p>
            <input
              type="text"
              value={modifyInfo.userName || ''}
              onChange={onChange}
              name="userName"
              placeholder="위드펫"
            />
            <p>전화번호</p>
            <input
              type="tel"
              value={modifyInfo.phoneNum || ''}
              onChange={onChange}
              name="phoneNum"
              placeholder="010-1234-5678"
            />
            <p>이메일</p>
            <input
              type="email"
              value={modifyInfo.userEmail || ''}
              onChange={onChange}
              name="userEmail"
              placeholder="withpet1@gmail.com"
            />
          </InputContainer>
          <InputContainer2>
            <div>
              <p>주소</p>
              <SearchButton type="button" onClick={handleClickFindAddress}>
                <SearchIcon />
              </SearchButton>
            </div>
            <input
              type="text"
              value={modifyInfo.zipcode || ''}
              onChange={onChange}
              name="zipcode"
              readOnly
              placeholder="우편번호"
            />
            <input
              type="text"
              value={modifyInfo.streetAdr || ''}
              onChange={onChange}
              name="streetAdr"
              readOnly
              placeholder="도로명주소"
            />
            <input
              type="text"
              value={modifyInfo.detailAdr || ''}
              onChange={onChange}
              name="detailAdr"
              placeholder="상세주소"
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
