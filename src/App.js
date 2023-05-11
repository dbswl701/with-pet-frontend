import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import MainPage from './pages/MainPage/MainPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Calendar from './pages/Calendar/Calendar';
import ViewProfile from './pages/ViewProfile/ViewProfile';
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
import ApiTest from './pages/ApiTest';
import EditProfile from './pages/EditProfile/EditProfile';
import AdminServicManage from './pages/AdminServicManage/AdminServicManage';

function App() {
  const [state, setState] = useState('false');
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar state={state} />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<Login setState={setState} />} />
          <Route path="/signup" element={<Signup />} />

          {/* 반려인 페이지 */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/usageList" element={<UsageList />} />
          <Route path="/petList" element={<PetList />} />
          <Route path="/petsitterdetail" element={<PetsitterDetial />} />

          {/* 펫시터 페이지 */}
          <Route path="/petsitterapply" element={<PetsitterApply />} />
          <Route path="/petsittercalendar" element={<PetsitterCalendar />} />
          <Route path="/petsittersdoginfo" element={<PetsittersDogInfo />} />
          <Route path="/petsitternewdog" element={<PetsitterNewDog />} />
          <Route path="/profit" element={<Profit />} />

          {/* 관리자 페이지 */}
          <Route path="/adminmainpage" element={<AdminMainPage />} />
          <Route path="/servicemanage" element={<AdminServicManage />} />
          <Route path="/adminapplyInfo" element={<AdminApplyInfo />} />
        </Route>
      </Routes>
      <ApiTest />
    </>

  );
}

export default App;
