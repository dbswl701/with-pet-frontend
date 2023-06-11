import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ChatBubble from './ChatBubble';
import chatButton from '../../assets/chatButton.png';

function ChatContent({ chatInfo, roomId }) {
  const [messageContent, setMessageContent] = useState('');
  const [receiveMsgList, setReceiveMsgList] = useState([]);
  const messageEndRef = useRef(null);
  const chatContentRef = useRef(null);
  const ws = useRef(null);

  function receiveMessage(who, sender, message, time) {
    setReceiveMsgList((prevMsgList) => [...prevMsgList, {
      who, sender, message, time,
    }]);
  }

  function connectStomp() {
    const socket = new SockJS('https://withpet.site/ws/chat');
    ws.current = Stomp.over(socket);
    ws.current.connect({}, () => {
      ws.current.subscribe(`/sub/chat/receive/${roomId}`, (event) => {
        const data = JSON.parse(event.body);
        const sender = data.senderId;
        const { message } = data;
        const time = data.chatTime;

        if (sender === parseInt(chatInfo.myId, 10)) {
          receiveMessage('my', sender, message, time);
        } else {
          receiveMessage('other', sender, message, time);
        }
      });
    });
  }

  useEffect(() => {
    setReceiveMsgList(
      chatInfo.chatMessages.map((msg) => ({
        who: msg.senderId === parseInt(chatInfo.myId, 10) ? 'my' : 'other',
        sender: msg.senderId,
        message: msg.message,
        time: msg.sendTime,
      })),
    );
    connectStomp();

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      ws.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [receiveMsgList]);

  function sendMessage(e) {
    e.preventDefault();
    const message = messageContent.replace(/\n/g, '\n'); // 개행 문자('\n')을 '<br>' 태그로 치환

    const time = new Date().toISOString();
    ws.current.send(
      `/pub/sendMessage/${roomId}`,
      {},
      JSON.stringify({
        senderId: chatInfo.myId,
        receiverId: chatInfo.otherId,
        message,
        sendTime: time,
      }),
    );
    setMessageContent('');
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <div
        ref={chatContentRef}
        style={{
          borderRadius: '10px',
          width: '800px',
          height: '425px',
          backgroundColor: '#FAF6F0',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {receiveMsgList.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ChatBubble msg={msg} key={index} />
        ))}
        <div ref={messageEndRef} />
      </div>
      <div style={{
        width: '800px', height: '75px', backgroundColor: 'white', border: '1px solid #CAA969',
      }}
      >
        <form onSubmit={sendMessage}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <textarea
              style={{
                width: '700px', border: 'none', resize: 'none', margin: '10px', outline: 'none',
              }}
              rows="3"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <div>
              <button
                type="submit"
                style={{
                  backgroundColor: 'transparent', width: '55px', height: '55px', border: 'none',
                }}
              >
                <img style={{ backgroundColor: 'transparent', width: '25px', height: '25px' }} src={chatButton} alt="전송 버튼" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatContent;
