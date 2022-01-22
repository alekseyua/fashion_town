import React from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import classNames from 'classnames';
import style from '../styles/wrapper.module.scss';

const BalanceItem = ({ greenText = false, value, text, icon }) => {
  const customClassName = classNames({
    [style["cabinet-balance__value"]]: true,
    [style['greentext']]: greenText,
  });
  return (
    <div className={style["cabinet-balance"]}>
      <div className={style["cabinet-balance__icon"]}>
        <GxIcon src={icon} alt={text} />
      </div>
      <div className={style["cabinet-balance__desc"]}>
        <div className={customClassName}>{value}</div>
        <div className={style["cabinet-balance__text"]}>{text}</div>
      </div>
    </div>
  );
};

export default React.memo(BalanceItem);
