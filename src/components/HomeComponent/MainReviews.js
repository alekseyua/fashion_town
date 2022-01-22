import React, { useState } from 'react';
import MainReviewsLayout from '../../Views/MainReviewsLayout';
import api from '../../api';

const apiContent = api.contentApi;
const MainReviews = ({ reviews: initialReviews, reviews_url, setModalStates }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const setLike = ({ id }) => {
    apiContent
      .postLikes({
        review: id,
        is_active: true,
      })
      .then(
        (res) => {
          setReviews(
            reviews.map((el) => {
              if (el.id === id) {
                return {
                  ...el,
                  isLiked: true,
                  likes_count: (el.likes_count += 1),
                };
              } else {
                return el;
              }
            }),
          );
        },
        (err) => {
          console.log('err MainReviews', err.response);
          //todo: вывод данных в нотифашку
        },
      );
  };
  return (
    <MainReviewsLayout
      reviews={reviews}
      reviews_url={reviews_url}
      setModalStates={setModalStates}
      setLike={setLike}
    />
  );
};
export default React.memo(MainReviews);
