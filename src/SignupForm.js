import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css'

function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //회원가입 시 백엔드로 보내는 로직
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      setPasswordConfirm('');
      return;
    }
    if (username === '' || password === '' || name === '' || phone === '' || address === '' || email === '') {
      alert('빈 칸을 모두 입력해주세요.');
      return;
    }
    
    axios.post('/api/signup', {
      username,
      password,
      name,
      phone,
      address,
      email
    })
    .then((response) => {
      console.log(response);
      navigate(`/`); // 회원가입 성공 시 로그인 페이지로 이동
    })
    .catch((error) => {
      console.error(error);
      navigate(`/`); //이거는 나중에 지워야함
      // 회원가입 실패 시 에러 메시지 표시
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="passwordConfirm">Password confirm:</label>
        <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}  />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
}

export default SignupPage;