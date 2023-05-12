import React from 'react';
import PetsitterInfo from './PetsitterInfo.json';

function Review() {
  return (
        <div>
            <h6>펫시터 후기</h6>
            <div>
                {PetsitterInfo.reviews.map((review) => (
                    <div>
                        <h6>작성자 : {review.user_name}</h6>
                        <h6>평균 평점 : {review.star_rate}</h6>
                        <h6>작성일 : {review.content}</h6>
                        <h6>내용 : {review.created_at}</h6>
                    </div>
                ))}
            </div>
        </div>
  );
}

export default Review;
