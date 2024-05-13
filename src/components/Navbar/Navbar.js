import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';
import NavNoLogin from './NavNoLogin';
import NavAfterLogin from './NavAfterLogin';
import AdminNavbar from './AdminNavbar';
import NavPetsitter from './NavPetsitter';
import useUserStore from '../../store/user';

function Nav() {
  // userInfo, setUserInfo
  const { user: userInfo } = useUserStore((state) => state);
  console.log('user 정보 확인:', userInfo);

  let print = <NavNoLogin />;
  if (userInfo.userName === '') {
    print = <NavNoLogin />;
  } else if (userInfo.userRole === 'ROLE_PETSITTER') {
    print = <NavPetsitter />;
  } else if (userInfo.userRole === 'ROLE_USER' || userInfo.userRole === 'ROLE_APPLICANT') {
    print = <NavAfterLogin />;
  } else if (userInfo.userRole === 'ROLE_ADMIN') {
    print = <AdminNavbar />;
  }
  return (
    <>
      { print }
      <Outlet />
    </>
  );
}

export default Nav;
