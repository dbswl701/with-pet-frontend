import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo_withpet.png';
import profile from '../../assets/user_default_profile.png';

function Nav() {
  const [toggle, setToggle] = useState(false);
  // const before = (
  //   <div className="nav-bar">
  //     <Link to="/">
  //       <img src={logo} className="logo" alt="로고" />
  //     </Link>
  //     <ul className="menu">
  //       <li>
  //         <Link to="/login">로그인</Link>
  //       </li>
  //       <li>
  //         <Link to="/signin">회원가입</Link>
  //       </li>
  //     </ul>
  //   </div>
  // );

  const dropdown = (
    <div className="dropdown-menu">
      <ul>
        <li>일지</li>
        <li>회원정보관리</li>
        <li>반려동물 정보관리</li>
        <li>로그아웃</li>
      </ul>
    </div>
  );

  const after = (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} className="logo" alt="로고" />
      </Link>
      <ul className="menu">
        <li onClick={() => { setToggle(!toggle); }} className="user-profile">
          <img src={profile} className="profile" alt="프로필" />
          <div className="user-name">
            <p>홍길동님</p>
            { toggle && dropdown }
          </div>
        </li>
        <li>
          <Link to="/signin">펫시터 지원</Link>
        </li>
      </ul>
    </div>
  );
  return (
    <>
      {after}
      <Outlet />
    </>
  );
}

export default Nav;
