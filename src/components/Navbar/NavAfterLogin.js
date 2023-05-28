import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo_withpet.png';
import profile from '../../assets/user_default_profile.png';

function Nav({ name }) {
  const [toggle, setToggle] = useState(false);

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  const dropdown = (
    <div
      className="dropdown-menu"
      style={{
        width: '300px', postion: 'absolute', right: '20px', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
      }}
    >
      <ul>
        <li style={{ listStyle: 'none', height: '40px' }}>
          <Link to="/calendar" style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>일지</Link>
        </li>
        <li style={{ listStyle: 'none', height: '40px' }}>
          <Link to="/viewProfile" style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>회원정보관리</Link>
        </li>
        <li style={{ listStyle: 'none', height: '40px' }}>
          <Link to="/petlist" style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>반려동물 정보관리</Link>
        </li>
        <li style={{ listStyle: 'none', height: '40px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>로그아웃</Link>
        </li>
        <li style={{ listStyle: 'none', height: '40px', marginBottom: '20px' }}>
          <Link to="/petsitterapply" style={{ textDecoration: 'none', color: 'black', fontSize: '15px' }}>펫시터 지원</Link>
        </li>
      </ul>
    </div>
  );

  const after = (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} className="logo" alt="로고" />
      </Link>
      <ul className="menu">
        <li onClick={toggleDropdown} className="user-profile">
          <img src={profile} className="profile" alt="프로필" />
          <div className={`user-name ${toggle ? 'active' : ''}`}>
            <p>{name}</p>
            {toggle && dropdown}
          </div>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      {after}
    </>
  );
}

export default Nav;
