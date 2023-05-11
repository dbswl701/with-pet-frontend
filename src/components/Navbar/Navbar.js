import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';
import NavNoLogin from './NavNoLogin';
import NavAfterLogin from './NavAfterLogin';
import AdminNavbar from './AdminNavbar';

function Nav({ state }) {
  let print = <NavNoLogin />;
  if (state === 'logout') {
    print = <NavNoLogin />;
  } else if (state === 'login') {
    print = <NavAfterLogin />;
  } else if (state === 'AdminNavbar') {
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
