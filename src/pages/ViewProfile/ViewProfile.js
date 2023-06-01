import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  width: 400px;
  padding: 20px;
  outline: 1px solid #f3deb5;
  border-radius: 5px;
  justify-content="center"
  z-index: 1;
  background-color: #fff;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content="center"
  align-items: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  justify-content="center"
  align-items: center;
  display: flex;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const ProfileImage = styled.img`
  max-width: 200px;
  height: auto;
`;

const Button = styled.button`
  background-color: #caa969;
  color: #fff;
  padding: 10px 50px;
  border-radius: 5px;
  border: none;
  margin: 0px auto;
  cursor: pointer;
`;

const url = 'https://withpet.site/api/v1/users/my-info';

function ViewProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        // 받아온 회원 정보를 state에 저장한다.
        setUserInfo(response.data.result);
      })
      .catch(() => {});
  }, []); // 두 번째 인자에 빈 배열을 전달하여, 처음 한 번만 호출되도록 한다.

  return (
    <div>
      {userInfo ? (
        <div>
          <Container>
            <Card>
              <FormTitle>회원 정보</FormTitle>
              <Form>
                <ProfileImage src={userInfo.profileImg} alt="프로필 사진" />
                <FormGroup>
                  <div>
                    <p>이름:</p>
                    <p>전화번호:</p>
                    <p>이메일:</p>
                    <p>우편번호:</p>
                    <p>도로명주소/상세주소:</p>
                  </div>
                  <div>
                    <p>{userInfo.userName}</p>
                    <p>{userInfo.phoneNum}</p>
                    <p>{userInfo.userEmail}</p>
                    <p>{userInfo.address.zipcode}</p>
                    <p>
                      {userInfo.address.streetAdr} {userInfo.address.detailAdr}
                    </p>
                  </div>
                </FormGroup>
                <Button
                  type="submit"
                  className="btn"
                  onClick={() => navigate('../editProfile')}
                >
                  수정하기
                </Button>
              </Form>
            </Card>
          </Container>
        </div>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  );
}

export default ViewProfile;
