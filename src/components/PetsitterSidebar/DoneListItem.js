import React from 'react';
// import styled from 'styled-components';
import social from '../../assets/social.png';
import { Container, Button } from '../../styles/SidebarStyle/SidebarStyle';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
//   border-radius:10px;
//   margin: 20px 0px;
// `;

// const Button = styled.button`
//   width: 190px;
//   height: 40px;
//   background-color: white;
//   border: 1px solid #CAA969;
//   border-radius: 3px;
// `;

function DoneListItem({ item }) {
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
          <img src={social} alt="heart" style={{ width: '16px', height: '16px' }} />
          <Button>평가하기</Button>
        </div>
      </Container>
    </>
  );
}

export default DoneListItem;
