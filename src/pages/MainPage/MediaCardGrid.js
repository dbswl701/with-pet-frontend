import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ImgWrapper, CardWrapper } from '../../styles/main/MainPageStyle';

function MediaCard({ data }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    // 눌렀을 때, 페이지 이동, petSitterId와 함께!
    // console.log('!!');
    navigate(`./petsitterdetail/${id}`);
  };
  return (
    <CardWrapper onClick={() => onClick(data.petSitterId)}>
      <ImgWrapper src={data.petSitterRepresentativeHouse} alt={data.userName} />
      <div style={{
        display: 'flex', fontFamily: 'Noto Sans KR', color: 'black',
      }}
      >
        <div style={{ fontSize: '1em', textAlign: 'left' }}>{data.userName}</div>
        <div style={{ fontSize: '1em', textAlign: 'right' }}>({data.review_count})</div>
      </div>
    </CardWrapper>
  );
}

function MediaCardGrid({ cards }) {
  return (
    <div id="grid">
      {cards && cards.map((card) => (
        // eslint-disable-next-line max-len
        <MediaCard key={card.petSitterId} data={card} />
      ))}
    </div>
  );
}

export default MediaCardGrid;
