import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';

// /chat?userId=1&roomId=2

function Chat() {
  const searchParams = useSearchParams()[0];
  const roomId = searchParams.get('roomId');
  const [roomList, setRoomList] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);
  // const [loading, setLoading] = useState(false);

  console.log(roomId);
  useEffect(() => {
    setChatInfo([]);
    // setLoading(true);
    // 사이드바, 내용에 대한 api 호출
    axios.get('https://withpet.site/chat/rooms', { withCredentials: true })
      .then((res) => {
        console.log(res.data.result);
        setRoomList(res.data.result);
      });
    if (roomId) {
      axios.get(`https://withpet.site/chat/room/${roomId}`, { withCredentials: true })
        .then((res) => {
          console.log(res.data.result);
          setChatInfo(res.data.result);
        });
    }

    // setLoading(false);
  }, [roomId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {/* 채팅 UI 렌더링 및 이벤트 핸들러 등 */}
      <ChatSidebar roomList={roomList} />
      { chatInfo.length !== 0 && <ChatContent chatInfo={chatInfo} roomId={roomId} /> }
    </div>
  );
}

export default Chat;
