import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo_withpet.png';
import baseUrl from '../../services/api';
import useUserStore from '../../store/user';

function AdminNavbar() {
  const navigate = useNavigate();
  const { logout } = useUserStore();

  const handleLogOut = () => {
    axios.post(`${baseUrl}/v2/users/sign-out`, {}, { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('로그아웃 되었습니다.');
        logout();
      });
    navigate('/');
  };

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
        <li>
          <Link to="/" onClick={handleLogOut}>로그아웃</Link>
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

export default AdminNavbar;
