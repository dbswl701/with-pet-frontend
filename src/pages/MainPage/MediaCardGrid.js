import React from 'react';
// import axios from 'axios';
// import './MediaCard.css'; // Import the CSS file that styles the media cards
// import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// const Grid = styled.div`
//     display: grid;
//     // grid-template-columns: repeat(5, 1fr);
//     justify-items: center;
//     padding: 20px;
//     gap: 20px;
//     margin: 0 auto;
// `;

// const Card = styled.div`
//     background-color: #fff;
// `;

function MediaCard({ data }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    // 눌렀을 때, 페이지 이동, petSitterId와 함께!
    // console.log('!!');
    navigate(`./petsitterdetail/${id}`);
  };
  return (
    <div onClick={() => onClick(data.petSitterId)} style={{ marginRight: '14px' }}>
      <div>
        <img src={data.petSitterRepresentativeHouse} alt={data.userName} style={{ width: '190px', height: '130px', borderRadius: '5px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{data.userName}</h3>
        <h4>({data.review_count})</h4>
      </div>
    </div>
  );
}

function MediaCardGrid({ cards }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', width: '1024px', flexWrap: 'wrap',
    }}
    >
      {cards && cards.map((card) => (
        // eslint-disable-next-line max-len
        <MediaCard key={card.petSitterId} data={card} />
      ))}
    </div>
  );
}

export default MediaCardGrid;
