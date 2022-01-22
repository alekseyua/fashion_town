import React from 'react';
import style from './styles/index.module.scss';

const HeaderOfSearch = ({ text }) => {
  return (
    <h1 className={style['catalog-search__header']}>{text}</h1>
  );
};

export default React.memo(HeaderOfSearch);
