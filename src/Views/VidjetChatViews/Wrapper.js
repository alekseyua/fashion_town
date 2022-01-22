import React from 'react';
import style from './styles/index.module.scss';

const Wrapper = ({ children }) => {
  return (
    <div className={style['widget__wrap']}>
      {' '}
      <div className={style['widget__chat']}>{children}</div>
    </div>
  );
};

export default React.memo(Wrapper);
