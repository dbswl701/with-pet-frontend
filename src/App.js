import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Calendar from "./pages/Calendar/Calendar";
import ViewProfile from "./pages/ViewProfile/ViewProfile";
import UsageList from "./pages/UsageList/UsageList";
import PetList from "./pages/PetList/PetList";
import PetsitterDetail from "./pages/PetsitterDetail/PetsitterDetail";
import PetsitterApply from "./pages/PetsitterApply/PetsitterApply";
import PetsitterCalendar from "./pages/PetsitterCalendar/PetsitterCalendar";
import PetsittersDogInfo from "./pages/PetsittersDogInfo/PetsittersDogInfo";
import PetsitterNewDog from "./pages/PetsitterNewDog/PetsitterNewDog";
import Profit from "./pages/Profit/Profit";
import AdminMainPage from "./pages/AdminMainPage/AdminMainPage";
import AdminApplyInfo from "./pages/AdminApplyInfo/AdminApplyInfo";
import PetsitterInfoManage from "./pages/PetsitterInfoManage/PetsitterInfoManage";
import EditProfile from "./pages/EditProfile/EditProfile";
import AdminServicManage from "./pages/AdminServicManage/AdminServicManage";
import PetsitterShowInfo from "./pages/PetsitterInfoManage/PetsitterShowInfo";
import UserDiaryList from "./pages/UserDiary/UserDiaryList";
import UserEvaluation from "./pages/UserEvaluation/UserEvaluation";
import PetsitterDiaries from "./pages/PetsitterDiaries/PetsitterDiaries";
import PetsitterInfoModify from "./pages/PetsitterInfoModify/PetsitterInfoModify";
import Chat from "./pages/Chat/Chat";
// import Notification from './pages/Notification/Notification';
import NotificationPage from "./pages/Notification/NotificationPage";
import ApplicantDetail from "./pages/AdminApplicantDetail/ApplicantDetail";
import PetsitterApply2 from "./pages/PetsitterApply/PetsitterApply2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<MainPage />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 반려인 페이지 */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/viewProfile" element={<ViewProfile />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/usageList" element={<UsageList />} />
          <Route path="/petList" element={<PetList />} />
          <Route path="/petsitterdetail/:id" element={<PetsitterDetail />} />
          <Route path="/userdiaryList" element={<UserDiaryList />} />
          <Route
            path="/petList/userEvaluation/:id"
            element={<UserEvaluation />}
          />

          {/* 펫시터 페이지 */}
          <Route path="/petsitterapply" element={<PetsitterApply />} />
          <Route path="/petsitterapply2" element={<PetsitterApply2 />} />
          <Route path="/petsittercalendar" element={<PetsitterCalendar />} />
          <Route path="/petsittersdoginfo" element={<PetsittersDogInfo />} />
          <Route path="/petsitternewdog" element={<PetsitterNewDog />} />
          <Route path="/profit" element={<Profit />} />
          <Route
            path="/petsitterInfoManage"
            element={<PetsitterInfoManage />}
          />
          <Route path="/petsitterShowInfo" element={<PetsitterShowInfo />} />
          <Route path="/petsitterDiaries" element={<PetsitterDiaries />} />
          <Route
            path="/petsitterInfoModify"
            element={<PetsitterInfoModify />}
          />
          <Route path="/chat" element={<Chat />} />

          {/* 관리자 페이지 */}
          <Route path="/adminmainpage" element={<AdminMainPage />} />
          <Route
            path="/adminmainpage/detail/:id"
            element={<ApplicantDetail />}
          />
          <Route path="/servicemanage" element={<AdminServicManage />} />
          <Route path="/adminapplyInfo" element={<AdminApplyInfo />} />

          <Route path="/notification" element={<NotificationPage />} />
        </Route>
      </Routes>
      {/* <Notification /> */}
    </QueryClientProvider>
  );
}

export default App;
