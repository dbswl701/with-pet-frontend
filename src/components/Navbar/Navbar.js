import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';
// import NavNoLogin from './NavNoLogin';
// import NavAfterLogin from './NavAfterLogin';
import AdminNavbar from './AdminNavbar';

function Nav() {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default Nav;
