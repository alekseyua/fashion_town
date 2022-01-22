import React from 'react';
import style from '../styles/index.module.scss';

const ReviewsRow = ({ children }) => {
  return <div className={style['productreviews__row']}>{children}</div>;
};

export default React.memo(ReviewsRow);
