import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';
import NavNoLogin from './NavNoLogin';
import NavAfterLogin from './NavAfterLogin';
import AdminNavbar from './AdminNavbar';
import NavPetsitter from './NavPetsitter';

function Nav({ userInfo }) {
  // console.log(userInfo);
  let print = <NavNoLogin />;
  if (userInfo.userName === '') {
    print = <NavNoLogin />;
  } else if (userInfo.role === 'ROLE_PETSITTER') {
    print = <NavPetsitter name={userInfo.userName} />;
  } else if (userInfo.role === 'ROLE_USER') {
    print = <NavAfterLogin name={userInfo.userName} />;
  } else if (userInfo.role === 'ROLE_ADMIN') {
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
