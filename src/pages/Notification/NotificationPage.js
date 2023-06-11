import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

function Item({ noti }) {
  const date = noti.createdAt.split('T')[0];
  // const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      // onMouseEnter={() => setToggle(true)}
      // onMouseLeave={() => setToggle(false)}
      onClick={() => navigate(`..${noti.url}`)}
      style={{
        cursor: 'pointer', justifyContent: 'space-evenly', marginBottom: '8px', alignItems: 'center', display: 'flex', flexDirection: 'row', width: '600px', height: '45px', backgroundColor: !noti.isRead ? '#FAF6F0' : 'white', border: '1.5px solid #CAA969', borderRadius: '10px',
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{noti.notificationType}</p>
      <p style={{ fontSize: '13px' }}>{noti.content}</p>
      <p style={{ fontSize: '13px' }}>{date}</p>
    </div>
  );
}
function NotificationPage() {
  const [notiList, setNotiList] = useState([]);
  useEffect(() => {
    axios.get('https://withpet.site/api/v1/notifications', { withCredentials: true })
      .then((res) => {
        setNotiList(res.data.result);
      });
  }, []);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <p style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>알림</p>
      <div style={{ marginTop: '17px' }}>
        { notiList && notiList.map((item) => {
          return <Item key={item.notificationId} noti={item} />;
        })}
      </div>
    </div>
  );
}

export default NotificationPage;
