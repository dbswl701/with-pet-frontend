import React from 'react';
import Users from "./ApiTest";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginForm';
import SignupForm from './SignupForm';
import EditProfile from "./EditProfile";

function App() {
  //임시 -> 나중에 서버에서 받아온 값으로 수정
  const password = "qlalfqjsgh";//비밀번호
  const name = "누구누구";//이름
  const phone = "123-456-7890";//전화번호
  const address = "어디어디";//주소
  const email = "uhdi@naver.com";//이메일

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
    </>

    // <div>
    //   <EditProfile
    //     password={password}
    //     name={name}
    //     phone={phone}
    //     address={address}
    //     email={email}
    //   />
    // </div>

  );
}

export default App;
