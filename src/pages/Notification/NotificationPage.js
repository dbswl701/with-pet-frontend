import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Item({ noti }) {
  const date = noti.createdAt.split('T')[0];
  return (
    <div style={{
      justifyContent: 'center', marginBottom: '8px', alignItems: 'center', display: 'flex', flexDirection: 'row', width: '600px', height: '45px', backgroundColor: '#FAF6F0', border: '1px solid #CAA969', borderRadius: '10px',
    }}
    >
      <p>{noti.notificationType}</p>
      <p style={{ fontSize: '13px' }}>{noti.content}</p>
      <p>{date}</p>
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      알림 페이지
      { notiList && notiList.map((item) => {
        return <Item key={item.notificationId} noti={item} />;
      })}
    </div>
  );
}

export default NotificationPage;
