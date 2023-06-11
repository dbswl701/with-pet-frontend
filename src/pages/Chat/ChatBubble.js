import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Bubble = styled.div`
  background-color: #CAA969;
  min-width: 200px;
  height: 40px;
  margin: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  padding: 10px;
  margin-left: 20px;
  color: white;
  `;
const Sender = styled(Bubble)`
  margin-right: 20px;
  margin-left: 5px;
  float: right:
`;
function ChatBubble({ msg }) {
  const time = dayjs(msg.time).format('HH:mm');

  let print = '';
  if (msg.who === 'my') {
    print = (
      <div style={{
        display: 'flex', flexDirection: 'row', float: 'right',
      }}
      >
        <div style={{ paddingTop: '20px' }}>
          <p style={{ fontSize: '10px' }}>{time}</p>
        </div>
        <Sender style={{ float: 'right' }}>
          <p>{msg.message}</p>
        </Sender>
      </div>

    );
  } else if (msg.who === 'other') {
    print = (
      <div style={{
        display: 'flex', flexDirection: 'row', float: 'left',
      }}
      >

        <Bubble>
          <p>{msg.message}</p>
        </Bubble>
        <div style={{ paddingTop: '20px' }}>
          <p style={{ fontSize: '10px' }}>{time}</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      { print }
    </div>
  );
}
export default ChatBubble;
