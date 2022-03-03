import React from 'react';
import style from './styles/index.module.scss';

const Date = ({ date }) => {
  return <p className={style['news-details__date']}>{date}</p>;
};

export default React.memo(Date);
