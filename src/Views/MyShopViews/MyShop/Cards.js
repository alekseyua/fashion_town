import React from 'react';
import style from '../index.module.scss';
import { GxIcon } from '@garpix/garpix-web-components-react';

const Cards = ({ name, count, arrowRightBlack, page }) => {
  return (
    <div className={style['cabinet_myshop__section_countblock']}>
      <a href={page}>
        <div className={style['cabinet_myshop__section_counthead']}>{name}</div>
        <div className={style['cabinet_myshop__section_countbottom']}>
          <GxIcon src={arrowRightBlack} className={style['cabinet_myshop__section_counticon']} />
          <div className={style['cabinet_myshop__section_counter']}>{count}</div>
        </div>
      </a>
    </div>
  );
};

export default React.memo(Cards);
