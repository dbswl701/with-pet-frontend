import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  background-color: #E3D5C2;
  width: 200px;
  min-width: 200px;
  height: 40px;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Sender = styled(Bubble)`
  float: right:
`;
function ChatBubble({ msg }) {
  // console.log(msg);
  let print = '';
  if (msg.who === 'my') {
    print = (
      <Sender style={{ float: 'right' }}>
        <p>{msg.message}</p>
      </Sender>
    );
  } else if (msg.who === 'other') {
    print = (
      <Bubble>
        <p>{msg.message}</p>
      </Bubble>
    );
  }
  return (
    <div>
      { print }
    </div>
  );
}
export default ChatBubble;
