import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

function SignupForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressRoad, setAddressRoad] = useState('');
  const [addressPost, setAddressPost] = useState('');
  const [addressDtail, setAddressDtail] = useState('');
  const [email, setEmail] = useState('');

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
    axios.post('/api/signup', {
      username,
      password,
      name,
      phone,
      addressRoad,
      addressPost,
      addressDtail,
      email,
    })
      .then((response) => {
        /* eslint-disable-next-line no-console */
        console.log(response);
        navigate('/'); // 회원가입 성공 시 로그인 페이지로 이동
      })
      .catch((error) => {
        /* eslint-disable-next-line no-console */
        console.error(error);
        // navigate(`/`); //이거는 나중에 지워야함
        // 회원가입 실패 시 에러 메시지 표시
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="username">아이디:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인:</label>
        <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="profile">프로필 사진:</label>
        <input type="file" accept="image/*" />
      </div>
      <div>
        <label htmlFor="phone">전화번호:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">우편번호:</label>
        <input type="text" id="address" value={addressPost} onChange={(e) => setAddressPost(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">도로명 주소:</label>
        <input type="text" id="address" value={addressRoad} onChange={(e) => setAddressRoad(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">상세주소:</label>
        <input type="text" id="address" value={addressDtail} onChange={(e) => setAddressDtail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">가입하기</button>
    </form>
  );
}

export default SignupForm;
