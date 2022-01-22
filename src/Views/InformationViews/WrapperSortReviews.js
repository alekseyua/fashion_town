import React from 'react';
import style from './styles/index.module.scss';

const WrapperSortReviews = ({ children }) => {
  return <div className={style['wrapper-sort']}>{children}</div>;
};

export default React.memo(WrapperSortReviews);
