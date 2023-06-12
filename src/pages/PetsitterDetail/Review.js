import React from 'react';
import Rating from '@mui/material/Rating';

function Review({ review }) {
  return (
    <div style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 3px 3px -2px', marginBottom: '20px' }}>
      <div style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ marginRight: '10px' }}>
            <img src={review.reviewerImg} alt="반려인 프로필 사진" style={{ width: '50px', height: '50px', alignItems: 'center' }} />
          </div>
          <div>
            <p style={{ fontSize: '16px', margin: '0px' }}>{review.reviewerName}</p>
            {/* <p style={{ fontSize: '16px', marginTop: '10px', marginBottom: '0px' }}>{review.rate}</p> */}
            <Rating name="read-only" value={review.grade} precision={0.1} readOnly />

          </div>
        </div>
        <div style={{ marginBottom: '30px', color: '#999999', fontSize: '14px' }}>
          <p>{review.createdAt.split('T')[0]}</p>
        </div>
      </div>
      <p>{review.content}</p>
    </div>
  );
}

export default Review;
