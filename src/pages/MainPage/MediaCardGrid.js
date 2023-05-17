import React from 'react';
// import axios from 'axios';
// import './MediaCard.css'; // Import the CSS file that styles the media cards
// import styled from 'styled-components';
import { ImgWrapper, CardContainer, CardWrapper } from './MainPageStyle';

// const Grid = styled.div`
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     justify-items: center;
//     padding: 20px;
//     gap: 20px;
//     margin: 0 auto;
// `;

// const Card = styled.div`
//     background-color: #fff;
// `;

function MediaCard({ title, image, rate }) {
  return (
    <CardWrapper>
      <ImgWrapper src={image} alt={title} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>{title}</h3>
        <h4>({rate})</h4>
      </div>
    </CardWrapper>
  );
}

function MediaCardGrid({ cards }) {
  return (
  // <div>
    <CardContainer>
      {cards && cards.map((card) => (
        // eslint-disable-next-line max-len
        <MediaCard key={card.petsitter_name} title={card.petsitter_name} image={card.house_image} rate={card.star_rate} />
      ))}
    </CardContainer>
  // </div>
  );
}

export default MediaCardGrid;
