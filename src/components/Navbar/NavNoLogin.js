import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo_withpet.png';

function Nav() {
  return (
    <>
      <div className="nav-bar">
        <Link to="/">
          <img src={logo} className="logo" alt="로고" />
        </Link>
        <ul className="menu">
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/signin">회원가입</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Nav;
