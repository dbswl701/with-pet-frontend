/* eslint-disable no-alert */
import axios from 'axios';
import baseUrl from './api';
// import { useNavigate } from 'react-router-dom';

const PostSignUp = ({
  password, name, phone, addressRoad, addressPost, addressDtail, email, imageSrc, passwordConfirm,
}) => {
  // const navigate = useNavigate();
  axios
    .post(`${baseUrl}/v2/users/sign-up`, {
      password,
      name,
      phone,
      address: {
        streetAdr: addressRoad,
        zipcode: addressPost,
        detailAdr: addressDtail,
      },
      email,
      // profileImg: imageSrc[0],
      profileImg: imageSrc,
      passwordCheck: passwordConfirm,
    })
    .then(() => {
      alert('회원가입에 성공했습니다.');
      // navigate('/');
    })
    .catch(() => {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    });
};

export default PostSignUp;
