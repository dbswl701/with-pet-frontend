import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import logo from '../../assets/logo_withpet.png';

function Nav({ userInfo, setUserInfo }) {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setToggle(!toggle);
  };

  const handleLogOut = () => {
    axios.get('https://withpet.site/api/v1/users/logout', { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('로그아웃 되었습니다.');
        setUserInfo(JSON.stringify({
          role: '',
          userName: '',
          userProfile: '',
        }));
        localStorage.setItem('userInfo', JSON.stringify({
          role: '',
          userName: '',
          userProfile: '',
        }));
      });
    navigate('/');
  };

  const dropdown = (
    <div
      className="dropdown-menu"
      style={{
        width: '300px', display: 'flex', padding: '10px 40px', flexDirection: 'column', postion: 'absolute', right: '20px', backgroundColor: 'white', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
      }}
    >
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/calendar')}
      >
        일지
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/viewProfile')}
      >
        회원정보관리
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/petlist')}
      >
        반려동물 정보관리
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/usagelist')}
      >
        이용내역 확인
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/notification')}
      >
        알림 페이지
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/petsitterapply')}
      >
        펫시터 지원
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={() => navigate('/chat')}
      >
        채팅
      </div>
      <div
        style={{
          listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
        }}
        onClick={handleLogOut}
      >
        로그아웃
      </div>
    </div>
  );

  const after = (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} className="logo" alt="로고" />
      </Link>
      <ul className="menu">
        <li onClick={toggleDropdown} className="user-profile">
          <img style={{ borderRadius: '50%', width: '60px', height: '40px' }} src={userInfo.userProfile} className="profile" alt="프로필" />
          <div className={`user-name ${toggle ? 'active' : ''}`}>
            <p>{userInfo.userName}</p>
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
