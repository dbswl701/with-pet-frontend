import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import dogBanner from "../../assets/dog_banner.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormTitle = styled.h3`
  text-align: center;
`;

const BannerBox = styled.div`
  position: relative;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-opacity: 100;
  font-family: "Noto Sans KR", sans-serif;
  color: #caa969;
  background-image: url(${dogBanner});
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
`;

const Card = styled.div`
  width: 400px;
  padding: 20px;
  outline: 1px solid #f3deb5;
  border-radius: 5px;
  margin-top: -30%;
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

const ButtonSignUp = styled.button`
  color: #000;
  background-color: #fff;
  padding: 10px;
  border: none;
  margin: 0px auto;
  cursor: pointer;
`;

function Login({ setState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://withpet.site/api/v1/users/login",
        {
          id: username,
          password,
        },
        { withCredentials: true }
      )
      .then(() => {
        setState("login");
        alert("로그인에 성공했습니다."); // eslint-disable-line no-alert
        navigate("../");
      })
      .catch(() => {
        alert("로그인에 실패했습니다."); // eslint-disable-line no-alert
      });
  };

  return (
    <>
      <div className="img">
        <BannerBox></BannerBox>
      </div>
      <div>
        <Container>
          <Card>
            <FormTitle>로그인</FormTitle>
            <Form>
              <div style={{ textAlign: "center" }}>
                <FormGroup>
                  <TextField
                    label="ID 입력"
                    type="text"
                    id="username"
                    size="small"
                    border="none"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <TextField
                    label="PW 입력"
                    type="password"
                    id="password"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
              </div>

              <Button type="submit" onClick={onSubmit}>
                로그인
              </Button>
              <ButtonSignUp type="submit" onClick={() => navigate("../signup")}>
                회원가입
              </ButtonSignUp>
            </Form>
          </Card>
        </Container>
      </div>
      ``
    </>
  );
}

export default Login;
