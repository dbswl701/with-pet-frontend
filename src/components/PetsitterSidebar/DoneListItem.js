import React, { useState } from 'react';
import styled from 'styled-components';
import social from '../../assets/social.png';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius:10px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 190px;
  height: 40px;
  background-color: white;
  border: 1px solid #CAA969;
  border-radius: 3px;
  cursor: pointer;
`;

function DoneListItem({ item, setPrintBody }) {
  console.log(item);
  const [showDiv, setShowDiv] = useState(false);
  const showButton = (
    <>
      <button>일지</button>
      <button>상세</button>
    </>
  );

  const onClick = () => {
    setPrintBody(['eval', item.reservationId]);
  };
  return (
    <>
      <Container onMouseEnter={() => setShowDiv(true)} onMouseLeave={() => setShowDiv(false)}>
        <div>
          <div className="1" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
            <img
              src={item.dogImg}
              alt="img"
              style={{
                width: '53px', height: '53px', borderRadius: '50%', marginRight: '10px', textAlign: 'center',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', margin: '7.5px 0px 7.5px 10px' }}>
              <p style={{ margin: '0px', marginBottom: '7px', fontSize: '13px' }}>
                {item.dogName} | {item.cost}
              </p>
              <p style={{ fontSize: '11px', margin: '0px' }}>{item.checkIn} ~ {item.checkOut}</p>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <img src={social} alt="heart" style={{ width: '16px', height: '16px' }} />
            <Button onClick={onClick}>평가하기</Button>
          </div>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </Container>
    </>
  );
}

export default DoneListItem;
