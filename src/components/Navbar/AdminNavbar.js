import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/logo_withpet.png';

function Nav({ setUserInfo }) {
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios.get('https://withpet.site/api/v1/users/logout', { withCredentials: true })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('로그아웃 되었습니다.');
        setUserInfo({
          role: '',
          userName: '',
          userProfile: '',
        });
      });
    navigate('/');
  };
  // console.log('관리자');
  const before = (
    <div className="nav-bar">
      <Link to="/">
        <img src={logo} className="logo" alt="로고" />
      </Link>
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
          onClick={() => navigate('/adminmainpage')}
        >
          펫시터 리스트
        </div>
        <div
          style={{
            listStyle: 'none', display: 'flex', height: '40px', color: 'black', fontSize: '15px', alignItems: 'center',
          }}
          onClick={() => navigate('/servicemanage')}
        >
          서비스 관리
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
    </div>
  );

  return (
    <>
      {before}
    </>
  );
}

export default Nav;
