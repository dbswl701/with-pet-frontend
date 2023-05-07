import React from 'react';
// import './MediaCard.css'; // Import the CSS file that styles the media cards
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    padding: 20px;
    gap: 20px;
    margin: 0 auto;
`;

const Card = styled.div`
    background-color: #fff;
`;

function MediaCard({ title, image, rate }) {
  return (
    <Card>
        <div>
            <img src={image} alt={title} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3>{title}</h3>
            <h4>({rate})</h4>
        </div>
    </Card>
  );
}

function MediaCardGrid({ cards }) {
  return (
    <Grid>
      {cards.map((card) => (
        <MediaCard key={card.id} title={card.name} image={card.house} rate={card.rate} />
      ))}
    </Grid>
  );
}

export default MediaCardGrid;
