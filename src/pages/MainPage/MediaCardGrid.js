import React from 'react';
import { useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';

function MediaCard({ data }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`./petsitterdetail/${id}`);
  };
  return (
    <div onClick={() => onClick(data.petSitterId)} style={{ marginRight: '14px', marginTop: '30px' }}>
      <div>
        <img src={data.petSitterRepresentativeHouse} alt={data.userName} style={{ width: '190px', height: '130px', borderRadius: '5px' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>{data.userName}</h3>
        <Rating name="read-only" value={data.star_rate} precision={0.1} readOnly size="small" />
        <h4>({data.review_count})</h4>
      </div>
    </div>
  );
}

function MediaCardGrid({ cards }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', width: '1024px', flexWrap: 'wrap', marginTop: '60px',
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
