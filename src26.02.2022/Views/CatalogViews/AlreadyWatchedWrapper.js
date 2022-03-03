import React from 'react';
import style from './styles/index.module.scss';

const AlreadyWatchedWrapper = ({ children }) => {
  return <div className={style['already-watched__wrapper']}>{children}</div>;
};

export default React.memo(AlreadyWatchedWrapper);
