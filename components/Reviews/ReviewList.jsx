// components/ReviewList.js
import React from 'react';
import Review from './Review';

const ReviewList = ({ reviews, onSelect }) => {
  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.id} review={review} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default ReviewList;
