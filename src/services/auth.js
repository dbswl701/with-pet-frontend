/* eslint-disable no-alert */
import axios from 'axios';
import baseUrl from './api';

const PostSignUp = async ({
  password, name, phone, addressRoad, addressPost, addressDtail, email, imageSrc, passwordConfirm,
}) => {
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
    console.error('회원가입에 실패했습니다.', err);
    throw err;
  }
};

export const PostSignIn = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.post(`${baseUrl}/v2/users/sign-in`, {
      email,
      password,
    }, { withCredentials: true });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const PostSignOut = async () => {
  try {
    const res = await axios.post(`${baseUrl}/v2/users/sign-out`, {}, { withCredentials: true });
    return res.data;
  } catch (err) {
    console.error('로그아웃에 실패했습니다.');
    throw err;
  }
};

export default { PostSignUp, PostSignIn, PostSignOut };
