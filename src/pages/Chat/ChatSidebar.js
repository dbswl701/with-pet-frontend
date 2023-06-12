import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Sidebar = styled.div`
  display: flex;
  position: relative;
  background-color: #FAF6F0;
  width: 300px;
  border-radius: 5px;
  margin: 20px 40px 50px 10px;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 10px 10px;
  height: 500px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
`;

const RoomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 280px;
  background-color: white;
  margin-top: 10px;
  padding: 0px 15px 0px 15px;
  border: 1px solid #CAA969;
  align-items: center;
`;

function RoomItem({ room }) {
  const navigate = useNavigate();
  const date = room.recentMessageTime.split('T')[0];

  return (
    <RoomWrapper onClick={() => navigate(`../chat?roomId=${room.chatRoomId}`)}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img
          style={{
            width: '40px', height: '40px', borderRadius: '50%', marginRight: '15px',
          }}
          src="https://withpetoriginimage.s3.ap-northeast-1.amazonaws.com/02f71a84-7269-4319-8840-7a8a3fe9ea25.jpg"
          alt="상대방 프로필 사진"
        />
        <p style={{ color: '#CAA969' }}>{room.otherName}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: '10px', margin: '0px', color: 'gray' }}>{date}</p>
        { room.notReceivedCount === 0 ? <div style={{ width: '20px', height: '20px' }}><p> </p></div>
          : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'red',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold',
              }}
            >
              <p>{room.notReceivedCount}</p>
            </div>
          ) }

      </div>

    </RoomWrapper>
  );
}

function ChatSidebar({ roomList }) {
  return (
    <Sidebar>
      { roomList.map((room) => (
        <RoomItem key={room.chatRoomId} room={room} />
      ))}
    </Sidebar>
  );
}

export default ChatSidebar;
