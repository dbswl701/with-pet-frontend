import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as S from "./Login.styles";
// import dogBanner from '../../assets/dog_banner.png';
import logo from "../../assets/logo.png";
import logoName from "../../assets/logo_name.png";
import googleSininImg from "../../assets/btn_google_signin_light_normal_web.png";
import useUserStore from "../../store/user";
import { PostSignIn } from "../../services/auth";
import useIdStore from "../../store/id";
import loginSchema, { RegisterSchemaType } from "../../schemas/login.schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUserRequest } from "../../types/user.types";
import { useLoginMutation } from "../../hooks/useLoginMutation";
// import { useLoginMutation } from "../../hooks/useLoginMutation";

function Login() {
  const {
    register,
    formState: { errors, isDirty },
    watch,
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: loginMutate } = useLoginMutation();

  const [loginInfo, setLoginInfo] = useState<IUserRequest>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // 아이디 기억하기
  const [isRemember, setIsRemember] = useState(false);
  const { rememberedId, setRememberedId, clearRememberedId } = useIdStore();

  useEffect(() => {
    // 시작했을 때, 아이디 정보 저장
    if (rememberedId !== "") {
      setLoginInfo({ ...loginInfo, email: rememberedId });
      setIsRemember(true);
    }
  }, []);

  const onSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    console.log("login info:", loginInfo);
    loginMutate(loginInfo);

    // 아이디 정보 저장
    if (isRemember) {
      setRememberedId(loginInfo.email);
      console.log("아이디 확인:", loginInfo.email);
    } else {
      clearRememberedId();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const onCheckIDRemember = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsRemember(e.target.checked);
  };

  return (
    <>
      <S.LogoContainer>
        <img src={logo} alt="로고" style={{ width: "98px", height: "98px" }} />
        <img
          src={logoName}
          alt="로고 이름"
          style={{ width: "229px", height: "98px" }}
        />
      </S.LogoContainer>
      <S.Content>
        <S.Input
          placeholder="이메일 입력"
          value={loginInfo.email}
          name="email"
          onChange={onChange}
        />
        <S.Input
          type="password"
          placeholder="비밀먼호 입력"
          value={loginInfo.password}
          name="password"
          onChange={onChange}
        />
        <S.IDSave>
          <input
            type="checkbox"
            id="id_save"
            onChange={onCheckIDRemember}
            checked={isRemember}
          />
          <label htmlFor="id_save">아이디 저장하기</label>
        </S.IDSave>
        <S.Button onClick={onSubmit}>로그인</S.Button>
        <img
          src={googleSininImg}
          alt="구글 로그인 이미지"
          style={{ width: "283px", height: "68px" }}
        />
        <Link to="../signup">회원가입</Link>
      </S.Content>
    </>
  );
}

export default Login;
