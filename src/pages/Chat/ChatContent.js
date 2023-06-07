import React, { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
// import axios from 'axios';
import ChatBubble from './ChatBubble';

function ChatContent({ chatInfo, roomId }) {
  const [messageContent, setMessageContent] = useState('');
  const [receiveMsgList, setReceiveMsgList] = useState([]);
  const ws = useRef(null);

  // function receiveMessage(who, sender, message, time) {
  //   console.log(sender);
  //   console.log(message);
  //   console.log(time);
  //   const temp = {
  //     who,
  //     sender,
  //     message,
  //     time,
  //   };
  //   console.log(receiveMsgList);
  //   setReceiveMsgList((prevMsgList) => [...prevMsgList, temp]);
  // }
  // console.log(receiveMsgList);

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
        console.log(event.body);
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
    setReceiveMsgList(chatInfo.chatMessages.map((msg) => {
      if (msg.senderId === parseInt(chatInfo.myId, 10)) {
        return {
          who: 'my', sender: msg.senderId, message: msg.message, time: msg.sendTime,
        };
      }
      return {
        who: 'other', sender: msg.senderId, message: msg.message, time: msg.sendTime,
      };
    }));
    console.log(chatInfo.chatMessages);
    connectStomp();

    // 컴포넌트 언마운트 시 WebSocket 연결 해제
    return () => {
      ws.current.disconnect();
    };
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const message = messageContent; // 메시지 입력 방식에 맞게 수정 필요
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
    console.log(time);
    setMessageContent('');
  }
  console.log(messageContent);
  return (
    // 채팅 ui
    <div style={{ marginTop: '20px' }}>
      <div>
        {/* <p>{}</p> */}
      </div>
      {/* 채팅 UI 렌더링 및 이벤트 핸들러 등 */}
      <div style={{
        borderRadius: '10px', width: '800px', height: '400px', backgroundColor: 'yellow', display: 'flex', flexDirection: 'column',
      }}
      >
        {/* 채팅창 ui */}
        { receiveMsgList.map((msg, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <ChatBubble msg={msg} key={index} />;
        })}
      </div>
      <div style={{ width: '800px', height: '100px', backgroundColor: 'green' }}>
        {/* 입력 ui */}
        <form onSubmit={sendMessage}>
          <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
          <input type="submit" value="전송" />
        </form>
      </div>
    </div>
  );
}

export default ChatContent;
