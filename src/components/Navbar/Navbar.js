import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';
import NavNoLogin from './NavNoLogin';
import NavAfterLogin from './NavAfterLogin';
import AdminNavbar from './AdminNavbar';
import NavPetsitter from './NavPetsitter';

function Nav({ userInfo, setUserInfo }) {
  let print = <NavNoLogin />;
  if (userInfo.userName === '') {
    print = <NavNoLogin />;
  } else if (userInfo.role === 'ROLE_PETSITTER') {
    print = <NavPetsitter userInfo={userInfo} setUserInfo={setUserInfo} />;
  } else if (userInfo.role === 'ROLE_USER' || userInfo.role === 'ROLE_APPLICANT') {
    print = <NavAfterLogin userInfo={userInfo} setUserInfo={setUserInfo} />;
  } else if (userInfo.role === 'ROLE_ADMIN') {
    print = <AdminNavbar setUserInfo={setUserInfo} />;
  }
  return (
    <>
      { print }
      <Outlet />
    </>
  );
}

export default Nav;
