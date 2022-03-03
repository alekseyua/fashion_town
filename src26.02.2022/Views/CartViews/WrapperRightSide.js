import React from 'react';
import style from './styles/index.module.scss';

const WrapperRightSide = ({ children }) => {
  return (
    <div className={style['right-side__wrapper']}>
      {children}
    </div>
  );
};

export default React.memo(WrapperRightSide);
