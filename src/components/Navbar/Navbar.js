import React from 'react';
import { Outlet } from 'react-router-dom';
import './Navbar.css';

function Nav() {
  return (
    <>
      <div className="header">
        <div className="logo_profile" />
      </div>
      <Outlet />
    </>
  );
}

export default Nav;
