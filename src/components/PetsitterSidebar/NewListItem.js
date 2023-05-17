import React from 'react';
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
  flex-direction: column;
  margin-bottom: 10px;
  border-radius:10px;
  margin: 20px 0px;
`;

function CurrentListItem({ item }) {
  console.log(item);
  return (
    <>
      <Container>
        <div className="1" style={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
          <img
            src={item.img}
            alt="img"
            style={{
              width: '53px', height: '53px', borderRadius: '50%', marginRight: '10px', textAlign: 'center',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', margin: '7.5px 0px 7.5px 10px' }}>
            <p style={{ margin: '0px', marginBottom: '7px', fontSize: '13px' }}>
              {item.name} | {item.price}
            </p>
            <p style={{ fontSize: '11px', margin: '0px' }}>{item.start_date} ~ {item.end_date}</p>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <img src={heart} alt="heart" style={{ width: '16px', height: '16px' }} />
          <Progress>
            <Dealt dealt={item.heart_degree} />
          </Progress>
          <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.heart_degree}%</p>
        </div>
        <div style={{ display: 'flex', marginTop: '5px' }}>
          <img src={social} alt="social" style={{ width: '16px', height: '16px' }} />
          <Progress>
            <Dealt dealt={item.social_degree} />
          </Progress>
          <p style={{ fontSize: '11px', margin: '0px', color: '#CAA969' }}>{item.social_degree}%</p>
        </div>
      </Container>
    </>
  );
}

export default CurrentListItem;
