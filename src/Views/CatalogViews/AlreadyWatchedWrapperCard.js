import React from 'react';
import style from './styles/index.module.scss';

const AlreadyWatchedWrapperCard = ({ children }) => {
  return <div className={style["already-watched__card_set"]}>{children}</div>;
};

export default React.memo(AlreadyWatchedWrapperCard);
