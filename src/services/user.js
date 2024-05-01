/* eslint-disable no-alert */
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostSignUp = ({
  password, name, phone, addressRoad, addressPost, addressDtail, email, imageSrc, passwordConfirm,
}) => {
  const navigate = useNavigate();

  axios
    .post('https://withpet.site/api/v2/users/signup', {
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
    })
    .then(() => {
      alert('회원가입에 성공했습니다.');
      navigate('/');
    })
    .catch(() => {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    });
};

export default PostSignUp;
