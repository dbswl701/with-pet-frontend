import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import ChatContent from './ChatContent';

function Chat() {
  const searchParams = useSearchParams()[0];
  const roomId = searchParams.get('roomId');
  const [roomList, setRoomList] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    setChatInfo([]);
    axios.get('https://withpet.site/chat/rooms', { withCredentials: true })
      .then((res) => {
        setRoomList(res.data.result);
      });
    if (roomId) {
      axios.get(`https://withpet.site/chat/room/${roomId}`, { withCredentials: true })
        .then((res) => {
          setChatInfo(res.data.result);
        });
    }
  }, [roomId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <ChatSidebar roomList={roomList} />
      { chatInfo.length !== 0 && <ChatContent chatInfo={chatInfo} roomId={roomId} /> }
    </div>
  );
}

export default Chat;
