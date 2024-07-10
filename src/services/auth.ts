/* eslint-disable no-alert */
import axios from "axios";
import baseUrl from "./api";
import { IUserRequest } from "../types/user.types";

interface ISingupInfo {
  password: string;
  name: string;
  phone: string;
  addressRoad: string;
  addressPost: string;
  addressDtail: string;
  email: string;
  imageSrc: string;
  passwordConfirm: string;
}

const PostSignUp = async ({
  password,
  name,
  phone,
  addressRoad,
  addressPost,
  addressDtail,
  email,
  imageSrc,
  passwordConfirm,
}: ISingupInfo) => {
  try {
    const res = await axios.post(`${baseUrl}/v2/users/sign-up`, {
      password,
      name,
      phone,
      address: {
        streetAdr: addressRoad,
        zipcode: addressPost,
        detailAdr: addressDtail,
      },
      email,
      profileImg: imageSrc[0],
      passwordCheck: passwordConfirm,
    });

    return res.data;
  } catch (err) {
    console.error("회원가입에 실패했습니다.", err);
    throw err;
  }
};

// export const PostSignIn = async ({ email, password }: { email: string; password: string }) => {
export const PostSignIn = async (userInfo: IUserRequest) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(
      `${baseUrl}/v2/users/sign-in`,
      {
        email: userInfo.email,
        password: userInfo.password,
      },
      { withCredentials: true },
    );
    return res.data.result;
  } catch (err) {
    throw err;
  }
};

export const PostSignOut = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/v2/users/sign-out`,
      {},
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    console.error("로그아웃에 실패했습니다.");
    throw err;
  }
};

export default { PostSignUp, PostSignIn, PostSignOut };
