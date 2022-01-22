import React from 'react';
import style from './styles/index.module.scss';

const Tags = ({ children }) => {
  return <div className={style['catalog-tags']}>{children}</div>;
};

export default React.memo(Tags);
