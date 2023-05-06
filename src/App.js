import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav';
// import PetList from './pages/PetList/PetList';
import ApiTest from './ApiTest';
import Navbar from './components/Navbar/Navbar';
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/Login/Login';
import Signin from './pages/Signin/Signin';
import Calendar from './pages/Calendar/Calendar';
import UserInfo from './pages/UserInfo/UserInfo';
import UsageList from './pages/UsageList/UsageList';
import PetList from './pages/PetList/PetList';
import PetsitterDetial from './pages/PetsitterDetial/PetsitterDetial';
import PetsitterApply from './pages/PetsitterApply/PetsitterApply';
import PetsitterCalendar from './pages/PetsitterCalendar/PetsitterCalendar';
import PetsittersDogInfo from './pages/PetsittersDogInfo/PetsittersDogInfo';
import PetsitterNewDog from './pages/PetsitterNewDog/PetsitterNewDog';
import Profit from './pages/Profit/Profit';
import AdminMainPage from './pages/AdminMainPage/AdminMainPage';
import AdminApplyInfo from './pages/AdminApplyInfo/AdminApplyInfo';

function App() {
  //임시 -> 나중에 서버에서 받아온 값으로 수정
  const password = "qlalfqjsgh";//비밀번호
  const name = "누구누구";//이름
  const phone = "123-456-7890";//전화번호
  const address = "어디어디";//주소
  const email = "uhdi@naver.com";//이메일

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />

          {/* 반려인 페이지 */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/usageList" element={<UsageList />} />
          <Route path="/petList" element={<PetList />} />
          <Route path="/petsitterdetail" element={<PetsitterDetial />} />

          {/* 펫시터 페이지 */}
          <Route path="/petsitterapply" element={<PetsitterApply />} />
          <Route path="/pesittercalendar" element={<PetsitterCalendar />} />
          <Route path="/petsittersdoginfo" element={<PetsittersDogInfo />} />
          <Route path="/petsitternewdog" element={<PetsitterNewDog />} />
          <Route path="/profit" element={<Profit />} />

          {/* 관리자 페이지 */}
          <Route path="/adminmainpage" element={<AdminMainPage />} />
          <Route path="/adminapplyInfo" element={<AdminApplyInfo />} />
        </Route>
      </Routes>
      {/* <Nav />
      <PetList /> */}
      <ApiTest />
    </>

  );
}

export default App;
