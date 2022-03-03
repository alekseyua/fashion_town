import React from 'react';
import style from './styles/index.module.scss';

const ButtonsWrapper = ({ leftBtn, rightBtn }) => {

  return (
    <div className={style['button-wrapper']}>
      {leftBtn}
      {rightBtn}
    </div>
  );
};

export default React.memo(ButtonsWrapper);
