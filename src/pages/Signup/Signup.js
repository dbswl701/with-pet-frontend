import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

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
    axios.post('https://withpet.site/api/v1/users/signup', {
      userId: username,
      userPassword: password,
      userName: name,
      phoneNum: phone,
      profileImg: '',
      address: {
        detailAdr: addressDtail,
        streetAdr: addressRoad,
        zipcode: addressPost,
      },
      userEmail: email,
      userPasswordCheck: passwordConfirm,
    })
      .then(() => {
        alert('회원가입에 성공했습니다.'); // eslint-disable-line no-alert
        navigate('/'); // 회원가입 성공 시 로그인 페이지로 이동
      })
      .catch(() => {
        alert('회원가입에 실패했습니다.'); // eslint-disable-line no-alert
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <div>
        <label htmlFor="username">아이디:</label>
        {/* // required 처리하면 됨 */}
        <input type="text" id="username" placeholder="ex) 아이디 입력" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" placeholder="ex) 영문자 + 숫자 + 특수기호" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label htmlFor="passwordConfirm">비밀번호 확인:</label>
        <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
      </div>
      <div>
        <label htmlFor="name">이름:</label>
        <input type="text" id="name" placeholder="ex) 홍길동" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
      <div>
        <label htmlFor="profile">프로필 사진:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            encodeFileToBase64(e.target.files[0]);
          }}
        />
      </div>
      <div>
        <label htmlFor="phone">전화번호:</label>
        <input type="text" id="phone" placeholder="ex) 010-0000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
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
        <input type="text" id="address" placeholder="ex) 건물명 / 동 / 호" value={addressDtail} onChange={(e) => setAddressDtail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" placeholder="ex) someone@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">가입하기</button>
    </form>
  );
}

export default SignupForm;
