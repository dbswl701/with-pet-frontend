import React, { useState } from 'react';
import styled from 'styled-components';
import social from '../../assets/social.png';
import heart from '../../assets/heart.png';

const Progress = styled.div`
  width: 148px;
  height: 10px;
  background-color: red;
  border-radius: 5px;
  margin: auto 10px;
`;

const Dealt = styled.div`
  background-color: yellow;
  width: ${(props) => `${props.dealt}%`};
  height: 100%;
  border-radius: 5px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  border-radius:10px;
  // margin: 20px 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;
  // padding: 20px;
`;

function CurrentListItem({ item }) {
  const [showDiv, setShowDiv] = useState(false);
  const showButton = (
    <>
      <button>일지</button>
      <button>상세</button>
    </>
  );

  console.log(item);
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
            <img src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
            <Progress>
              <Dealt dealt={item.affectionTemperature} />
            </Progress>
            <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.affectionTemperature}%</p>
          </div>
          <div style={{ display: 'flex', marginTop: '5px' }}>
            <img src={social} alt="social" style={{ width: '16px', height: '16px' }} />
            <Progress>
              <Dealt dealt={item.socializationTemperature} />
            </Progress>
            <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.socializationTemperature}%</p>
          </div>
        </div>
        <div>
          {showDiv && showButton}
        </div>
      </Container>
    </>
  );
}

export default CurrentListItem;
