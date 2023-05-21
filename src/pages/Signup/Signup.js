import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    label {
      margin-bottom: 10px;
      font-weight: bold;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ddd;
      outline: none;
      margin-bottom: 20px;
    }

    input[type='file'] {
      margin: 20px 0;
    }
  }

  .preview {
    grid-column: 2/3;
    display: flex;
    justify-content: center;

    img {
      max-width: 200px;
      max-height: 200px;
      margin-bottom: 20px;
    }
  }

  button[type='submit'] {
    grid-column: 0/3;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #0077cc;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
      background-color: #0065a5;
    }
  }
`;

function SignupForm() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressRoad, setAddressRoad] = useState('');
  const [addressPost, setAddressPost] = useState('');
  const [addressDtail, setAddressDtail] = useState('');
  const [email, setEmail] = useState('');

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 시 백엔드로 보내는 로직
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.'); // eslint-disable-line no-alert
      setPasswordConfirm('');
      return;
    }
    if (username === '' || password === '' || name === '' || phone === '' || addressRoad === '' || addressPost === '' || addressDtail === '' || email === '') {
      alert('빈 칸을 모두 입력해주세요.'); // eslint-disable-line no-alert
      return;
    }
    const data = {
      address: {
        detailAdr: addressDtail,
        streetAdr: addressRoad,
        zipcode: addressPost,
      },
      phoneNum: phone,
      profileImg: imageSrc,
      userEmail: email,
      userId: username,
      userName: name,
      userPassword: password,
      userPasswordCheck: passwordConfirm,
    };
    axios.post('https://withpet.site/api/v1/users/signup', data, { withCredentials: true })
      .then(() => {
        // console.log(res);
        navigate('/login');
      })
      .catch(() => {
        // console.error(err);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.'); // eslint-disable-line no-alert
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    await encodeFileToBase64(file);
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="addressRoad">주소(도로명)</label>
          <input
            type="text"
            id="addressRoad"
            value={addressRoad}
            onChange={(e) => setAddressRoad(e.target.value)}
          />
          <label htmlFor="addressPost">주소(우편번호)</label>
          <input
            type="text"
            id="addressPost"
            value={addressPost}
            onChange={(e) => setAddressPost(e.target.value)}
          />
          <label htmlFor="addressDtail">주소(상세주소)</label>
          <input
            type="text"
            id="addressDtail"
            value={addressDtail}
            onChange={(e) => setAddressDtail(e.target.value)}
          />
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="preview">
          {imageSrc && <img src={imageSrc} alt="프로필 사진 미리보기" />}
          <input type="file" onChange={handleImageUpload} />
        </div>
        <button type="submit">회원가입</button>
      </Form>
    </Container>
  );
}

export default SignupForm;
