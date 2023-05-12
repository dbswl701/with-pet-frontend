import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_withpet.png';

function Nav() {
  const before = (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} className="logo" alt="로고" />
      </Link>
      <ul className="menu">
        <li>
          <Link to="/adminmainpage">펫시터 리스트</Link>
        </li>
        <li>
          <Link to="/servicemanage">서비스 관리</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {before}
    </>
  );
}

export default Nav;
